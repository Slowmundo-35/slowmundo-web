import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import crypto from "node:crypto";
import { writeClient, assertWriteTokenPresent } from "@/sanity/lib/writeClient";

// Force Node.js runtime (nodemailer needs `net`/`tls`, not Edge)
export const runtime = "nodejs";
// Never cached — every submission is a fresh POST
export const dynamic = "force-dynamic";

/* ============================================================
 * Validation
 * ============================================================ */

// Shared fields (both forms)
const BaseSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: z.string().trim().min(4).max(40),
  message: z.string().trim().max(4000).optional().default(""),
  // Honeypot — humans never fill this hidden field. Bots often do.
  // We accept it in the payload but reject the submission if non-empty.
  website: z.string().max(0).optional().default(""),
});

// Trip-page form (embedded on /voyages/[country]/[slug])
const TripSchema = BaseSchema.extend({
  source: z.literal("trip"),
  tripCountry: z.string().trim().min(1).max(80),
  tripTitle: z.string().trim().max(200).optional(),
  groupSize: z.string().trim().max(10),
  residence: z.string().trim().max(40),
});

// Generic /contact page form
const ContactSchema = BaseSchema.extend({
  source: z.literal("contact"),
  continent: z.string().trim().max(40),
  destinations: z.array(z.string().trim().max(80)).max(20).default([]),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consentement RGPD requis",
  }),
});

const PayloadSchema = z.discriminatedUnion("source", [TripSchema, ContactSchema]);

/* ============================================================
 * SMTP transport (OVH)
 * ============================================================ */

function makeTransport() {
  const host = process.env.SMTP_HOST || "ssl0.ovh.net";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP_USER / SMTP_PASS env vars");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit SSL, 587 = STARTTLS
    auth: { user, pass },
  });
}

/* ============================================================
 * Helpers
 * ============================================================ */

function hashIp(ip: string | null): string {
  if (!ip) return "unknown";
  const salt = process.env.IP_HASH_SALT || "slowmundo-default-salt";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

type Payload = z.infer<typeof PayloadSchema>;

function buildEmailBody(payload: Payload): { subject: string; html: string; text: string } {
  const fullName = `${payload.firstName} ${payload.lastName}`;
  const lines: Array<[string, string]> = [
    ["Prénom", payload.firstName],
    ["Nom", payload.lastName],
    ["Email", payload.email],
    ["Téléphone", payload.phone],
  ];

  let subject: string;
  if (payload.source === "trip") {
    subject = `[Slowmundo] Nouvelle demande — ${payload.tripTitle || payload.tripCountry} — ${fullName}`;
    lines.push(["Voyage", payload.tripTitle || "(non spécifié)"]);
    lines.push(["Pays", payload.tripCountry]);
    lines.push(["Nombre de personnes", payload.groupSize]);
    lines.push(["Résidence", payload.residence]);
  } else {
    subject = `[Slowmundo] Nouvelle demande contact — ${fullName}`;
    lines.push(["Continent", payload.continent]);
    lines.push([
      "Destinations",
      payload.destinations.length ? payload.destinations.join(", ") : "(aucune)",
    ]);
  }

  if (payload.message) {
    lines.push(["Message", payload.message]);
  }

  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; padding: 24px; color: #222;">
      <h2 style="color: #0d7e5c; margin: 0 0 16px;">Nouvelle demande Slowmundo</h2>
      <table style="border-collapse: collapse; width: 100%;">
        ${lines
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; border: 1px solid #e5e5e5; font-weight: 600; width: 40%;">${escapeHtml(k)}</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e5e5; white-space: pre-wrap;">${escapeHtml(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        Consultable aussi dans Sanity Studio → Demandes de contact.
      </p>
    </div>
  `;
  return { subject, html, text };
}

/* ============================================================
 * POST handler
 * ============================================================ */

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = PayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const payload = parsed.data;

  // Honeypot — silently pretend success so bots don't retry
  if (payload.website && payload.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Reject obvious message spam (URL count)
  const urlCount = (payload.message?.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const submittedAt = new Date().toISOString();
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;
  const ipHash = hashIp(ip);
  const userAgent = req.headers.get("user-agent")?.slice(0, 300) || "";

  // 1) Persist to Sanity
  try {
    assertWriteTokenPresent();
    const doc: { _type: string } & Record<string, unknown> = {
      _type: "contactSubmission",
      status: "nouveau",
      source: payload.source,
      submittedAt,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      message: payload.message || undefined,
      userAgent,
      ipHash,
    };
    if (payload.source === "trip") {
      doc.tripCountry = payload.tripCountry;
      doc.tripTitle = payload.tripTitle;
      doc.groupSize = payload.groupSize;
      doc.residence = payload.residence;
    } else {
      doc.continent = payload.continent;
      doc.destinations = payload.destinations;
    }
    await writeClient.create(doc);
  } catch (err) {
    console.error("[/api/contact] Sanity write failed:", err);
    // Don't fail the whole request — user still gets emailed thanks to step 2
  }

  // 2) Notify Alexis by email
  try {
    const transport = makeTransport();
    const { subject, html, text } = buildEmailBody(payload);
    await transport.sendMail({
      from: `"Slowmundo" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER!,
      replyTo: `"${payload.firstName} ${payload.lastName}" <${payload.email}>`,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[/api/contact] Email send failed:", err);
    // If email fails but Sanity succeeded, still return ok — Alexis can
    // see the submission in Studio. If both fail we still say ok to avoid
    // leaking infra details; logs surface the real issue.
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
