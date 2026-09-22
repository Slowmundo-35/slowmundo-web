import { useCallback, useState } from "react";
import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { SearchIcon } from "@sanity/icons";
import type { StringInputProps, Path } from "sanity";
import { useClient, useFormValue } from "sanity";

/**
 * Custom input for `locationName` on itineraryDay.
 *
 * Renders the default string input plus a "Générer les coordonnées"
 * button. When clicked, it looks the location up on OpenStreetMap's
 * Nominatim geocoder (free, no key, ~1 req/sec limit) and patches the
 * sibling `lat` / `lng` fields of the same itinerary-day item.
 *
 * The button uses the Sanity mutation client directly rather than
 * onChange — onChange can only touch the current field, and lat/lng
 * live one level up in the parent object.
 */

/**
 * Convert a Sanity form path like
 *   ['itinerary', {_key: 'abc123'}, 'locationName']
 * into the mutation-selector string
 *   'itinerary[_key=="abc123"].locationName'
 * so we can point client.patch(...).set(...) at nested array items.
 */
function pathToSelector(path: Path): string {
  return path
    .map((seg) => {
      if (typeof seg === "string") return seg;
      if (typeof seg === "number") return `[${seg}]`;
      if (
        seg &&
        typeof seg === "object" &&
        "_key" in seg &&
        typeof seg._key === "string"
      ) {
        return `[_key=="${seg._key}"]`;
      }
      return "";
    })
    .filter(Boolean)
    .reduce<string>((acc, part) => {
      if (!acc) return part;
      if (part.startsWith("[")) return acc + part;
      return acc + "." + part;
    }, "");
}

export function GeocodeLocationInput(props: StringInputProps) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    tone: "positive" | "critical" | "caution";
    text: string;
  } | null>(null);

  const client = useClient({ apiVersion: "2024-10-01" });
  // The form always exposes _id on the top-level document — for a draft
  // this is `drafts.<id>`, so patching it goes to the same draft the
  // user is editing (not the published version).
  const docId = useFormValue(["_id"]) as string | undefined;
  const locationName = (props.value ?? "").trim();

  const handleGeocode = useCallback(async () => {
    if (!docId) {
      setFeedback({
        tone: "critical",
        text: "Document non identifié — sauvegarde d'abord ce brouillon.",
      });
      return;
    }
    if (!locationName) {
      setFeedback({
        tone: "caution",
        text: "Renseigne d'abord un nom de lieu au-dessus.",
      });
      return;
    }

    setLoading(true);
    setFeedback(null);
    try {
      // Proxied through our own /api/geocode so the request carries a
      // valid User-Agent (Nominatim's usage policy) and the browser only
      // talks to same-origin — keeps the Studio CSP simple.
      const url = `/api/geocode?q=${encodeURIComponent(locationName)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data = (await res.json()) as {
        lat?: number;
        lng?: number;
        displayName?: string | null;
        error?: string;
        results?: unknown[];
      };
      if (!res.ok) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      if (typeof data.lat !== "number" || typeof data.lng !== "number") {
        setFeedback({
          tone: "critical",
          text: `Aucun résultat pour « ${locationName} ». Essaie une orthographe plus précise (ex : "Lucerne, Suisse").`,
        });
        return;
      }
      const lat = data.lat;
      const lng = data.lng;

      // Parent path = everything except the last segment (`locationName`).
      const parentPath = props.path.slice(0, -1);
      const selector = pathToSelector(parentPath);
      await client
        .patch(docId)
        .set({
          [`${selector}.lat`]: lat,
          [`${selector}.lng`]: lng,
        })
        .commit({ autoGenerateArrayKeys: false, visibility: "async" });

      setFeedback({
        tone: "positive",
        text: `Coordonnées appliquées : ${lat.toFixed(4)}, ${lng.toFixed(4)}${
          data.displayName ? ` — ${data.displayName}` : ""
        }`,
      });
    } catch (err) {
      setFeedback({
        tone: "critical",
        text:
          err instanceof Error
            ? `Erreur : ${err.message}`
            : "Erreur inconnue lors du géocodage.",
      });
    } finally {
      setLoading(false);
    }
  }, [client, docId, locationName, props.path]);

  return (
    <Stack style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {props.renderDefault(props)}
      <Flex align="center" gap={2} wrap="wrap">
        <Button
          type="button"
          mode="ghost"
          tone="primary"
          icon={SearchIcon}
          onClick={handleGeocode}
          loading={loading}
          disabled={loading || !locationName}
          text="Générer les coordonnées depuis le lieu"
        />
        <Text muted size={1}>
          via OpenStreetMap (gratuit, sans clé API)
        </Text>
      </Flex>
      {feedback && (
        <Card
          padding={2}
          radius={2}
          shadow={1}
          tone={feedback.tone}
          border
        >
          <Text size={1}>{feedback.text}</Text>
        </Card>
      )}
    </Stack>
  );
}
