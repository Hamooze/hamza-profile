import { ExternalLink, Globe2, Mail } from "lucide-react";
import { useId, type CSSProperties } from "react";
import type { LinkKind } from "@/lib/profile-types";

const BRAND_MARKS: Partial<Record<LinkKind, string>> = {
  github: "github.svg",
  linkedin: "linkedin.svg",
  instagram: "instagram.svg",
  whatsapp: "whatsapp.svg"
};

// Extract the ink from the original white-backed mark at render time. The
// source image and its B/crescent geometry remain untouched.
function BarmousMark() {
  const id = useId();
  return (
    <svg viewBox="0 0 1254 1254" className="brand-logo-shape" focusable="false">
      <defs>
        <filter id={`${id}-ink`} colorInterpolationFilters="sRGB">
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1 -1 -1 0 3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="1.5" intercept="-0.1" />
          </feComponentTransfer>
        </filter>
        <mask id={`${id}-mark`} style={{ maskType: "alpha" }}>
          <image href="/brand/barmous.png" width="1254" height="1254" filter={`url(#${id}-ink)`} />
        </mask>
      </defs>
      <rect width="1254" height="1254" fill="currentColor" mask={`url(#${id}-mark)`} />
    </svg>
  );
}

export function LinkIcon({ kind, url, size = 28 }: { kind: LinkKind; url?: string; size?: number }) {
  let brand: string = kind;
  if (kind === "website" && url) {
    try {
      const host = new URL(url).hostname.replace(/^www\./, "");
      if (host === "barmous.ae") brand = "barmous";
      if (host === "nemu.ae") brand = "nemu";
    } catch {
      // Unknown links retain the generic website icon.
    }
  }

  const asset = brand === "nemu" ? "nemu.png" : BRAND_MARKS[kind];
  if (asset || brand === "barmous") {
    return (
      <span
        aria-hidden="true"
        className={`brand-logo brand-logo-${brand}`}
        style={{ width: size, height: size, "--brand-mask": asset ? `url("/brand/${asset}")` : undefined } as CSSProperties}
      >
        {brand === "barmous" ? <BarmousMark /> : <span className="brand-logo-shape brand-logo-mask" />}
      </span>
    );
  }

  const Icon = kind === "email" ? Mail : kind === "website" ? Globe2 : ExternalLink;
  return <Icon aria-hidden="true" size={size} strokeWidth={2.2} />;
}
