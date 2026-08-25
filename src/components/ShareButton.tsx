"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ShareButtonProps {
  /** Optional override — defaults to the current page URL at click time. */
  url?: string;
  /** Optional text used to prefill share captions (Twitter/WhatsApp/Email). */
  title?: string;
  className?: string;
}

/**
 * A "Partager" button with a dropdown offering:
 *   Facebook, Twitter/X, LinkedIn, WhatsApp, Email — plus "Copier le lien".
 *
 * Reads `window.location.href` / `document.title` lazily so it works on any
 * client page without needing the parent to know its own URL.
 */
export default function ShareButton({ url, title, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape key
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const resolveUrl = () => url ?? (typeof window !== "undefined" ? window.location.href : "");
  const resolveTitle = () => title ?? (typeof document !== "undefined" ? document.title : "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolveUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silently ignore — clipboard may be blocked in some browsers
    }
  };

  const openShare = (target: (u: string, t: string) => string) => {
    const shareUrl = target(resolveUrl(), resolveTitle());
    window.open(shareUrl, "_blank", "width=600,height=600,noopener,noreferrer");
    setOpen(false);
  };

  const networks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    },
    {
      name: "Twitter / X",
      icon: Twitter,
      href: (u: string, t: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: (u: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: (u: string, t: string) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent(`${t} ${u}`)}`,
    },
    {
      name: "Email",
      icon: Mail,
      href: (u: string, t: string) =>
        `mailto:?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(u)}`,
    },
  ];

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Partager cette page"
        className="inline-flex items-center gap-2 bg-white text-text-main border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-40"
          >
            {networks.map((net) => (
              <button
                key={net.name}
                role="menuitem"
                type="button"
                onClick={() => openShare(net.href)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-text-main text-left"
              >
                <net.icon className="w-4 h-4 text-primary shrink-0" />
                <span>{net.name}</span>
              </button>
            ))}

            <div className="border-t border-gray-100 my-1" />

            <button
              role="menuitem"
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-text-main text-left"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-primary shrink-0" />
              )}
              <span>{copied ? "Lien copié !" : "Copier le lien"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
