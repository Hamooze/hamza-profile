import type { LinkKind, Profile, ProfileLink } from "@/lib/profile-types";

const LINK_KINDS: LinkKind[] = [
  "github",
  "linkedin",
  "instagram",
  "whatsapp",
  "email",
  "website",
  "other"
];

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function isAllowedUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function normalizeKind(value: unknown): LinkKind {
  return LINK_KINDS.includes(value as LinkKind) ? (value as LinkKind) : "other";
}

function sanitizeLink(value: unknown, index: number): ProfileLink | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const label = asString(candidate.label);
  const url = asString(candidate.url);

  if (!label || !url || !isAllowedUrl(url)) {
    return null;
  }

  return {
    id:
      asString(candidate.id) ||
      `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
    label,
    url,
    kind: normalizeKind(candidate.kind),
    featured: Boolean(candidate.featured)
  };
}

export function sanitizeProfile(input: unknown): Profile {
  if (!input || typeof input !== "object") {
    throw new Error("Profile payload is missing.");
  }

  const candidate = input as Record<string, unknown>;
  const links = Array.isArray(candidate.links)
    ? candidate.links
        .map((link, index) => sanitizeLink(link, index))
        .filter((link): link is ProfileLink => Boolean(link))
    : [];

  if (links.length === 0) {
    throw new Error("Add at least one valid link.");
  }

  const email = asString(candidate.email);
  const avatarUrl = asString(candidate.avatarUrl);

  if (avatarUrl && !isAllowedUrl(avatarUrl)) {
    throw new Error("Avatar URL must be a valid URL.");
  }

  return {
    displayName: asString(candidate.displayName, "Hamza Tahayneh"),
    handle: asString(candidate.handle, "Hamooze"),
    tagline: asString(candidate.tagline),
    location: asString(candidate.location),
    email,
    avatarUrl,
    status: asString(candidate.status),
    intro: asString(candidate.intro),
    links
  };
}
