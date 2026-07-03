import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Orbit,
  Rocket,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import type { CSSProperties } from "react";
import { CosmicAnimeStage } from "@/components/cosmic-anime-stage";
import { LinkIcon } from "@/components/link-icons";
import { getProfile } from "@/lib/profile-store";
import type { LinkKind, ProfileLink } from "@/lib/profile-types";

export const runtime = "nodejs";
export const preferredRegion = "dxb1";

function readableUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const LINK_DESCRIPTIONS: Record<LinkKind, string> = {
  github: "Code, experiments, and builds",
  linkedin: "Professional network",
  instagram: "Photos and daily updates",
  whatsapp: "Direct message line",
  email: "Work and collaborations",
  website: "Project or company site",
  other: "External transmission"
};

function linkDescription(link: ProfileLink) {
  if (link.kind === "website") {
    return readableUrl(link.url);
  }

  return LINK_DESCRIPTIONS[link.kind] || LINK_DESCRIPTIONS.other;
}

function DecorativeElements() {
  return (
    <div className="cosmic-decor" aria-hidden="true">
      <Star className="decor-star decor-star-one" fill="currentColor" size={32} />
      <Sparkles className="decor-star decor-star-two" size={48} />
      <Star className="decor-star decor-star-three" fill="currentColor" size={24} />
      <div className="decor-planet decor-planet-purple" />
      <div className="decor-planet decor-planet-green" />
      <div className="orbit-line orbit-line-large" />
      <div className="orbit-line orbit-line-small" />
      <Rocket className="decor-rocket" fill="currentColor" size={40} />
    </div>
  );
}

export default async function Home() {
  const profile = await getProfile();
  const featuredLinks = profile.links.filter((link) => link.featured);
  const allLinks = profile.links;
  const featuredLink = featuredLinks[0] || allLinks[0];

  return (
    <main className="site-shell cosmic-shell">
      <DecorativeElements />
      <CosmicAnimeStage />

      <section className="cosmic-hero">
        <div className="speech-bubble">
          <span className="eyebrow-dot" aria-hidden="true" />
          Welcome to my orbit.
        </div>

        <div className="avatar-orbit">
          <div className="avatar-shadow" />
          <img alt={profile.displayName} className="avatar-image" src={profile.avatarUrl} />
          <div className="avatar-star">★</div>
        </div>

        <div className="hero-title-block">
          <p className="eyebrow hero-status">
            {profile.status}
          </p>
          <h1>{profile.displayName}</h1>
          <div className="tagline-chip">
            <p className="tagline">{profile.tagline}</p>
          </div>

          <div className="meta-row" aria-label="Profile details">
            {profile.location ? (
              <span className="meta-pill">
                <MapPin size={16} aria-hidden="true" />
                {profile.location}
              </span>
            ) : null}
            {profile.email ? (
              <a className="meta-pill" href={`mailto:${profile.email}`}>
                <Mail size={16} aria-hidden="true" />
                {profile.email}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {featuredLink ? (
        <section className={`featured-panel featured-${featuredLink.kind}`}>
          <div className="featured-badge">MAIN</div>
          <a
            className="featured-link"
            href={featuredLink.url}
            rel="noreferrer"
            target="_blank"
          >
            <div className="featured-stripes" />
            <div className="featured-inner">
              <div className="featured-copy">
                <div className="featured-heading">
                  <Zap size={24} aria-hidden="true" />
                  <h2>{featuredLink.label}</h2>
                </div>
                <p>{linkDescription(featuredLink)}</p>
              </div>
              <span className="featured-button">
                Enter My Orbit
                <ArrowRight size={20} aria-hidden="true" />
              </span>
            </div>
          </a>
        </section>
      ) : null}

      <section className="cosmic-link-grid" aria-label="Profile links">
        {allLinks.map((link, index) => (
          <a
            className={`orbit-link-card orbit-card-${link.kind}`}
            href={link.url}
            key={link.id}
            rel="noreferrer"
            style={{ "--card-delay": `${index * 80}ms` } as CSSProperties}
            target="_blank"
          >
            <span className="orbit-link-icon">
              <LinkIcon kind={link.kind} />
            </span>
            <span className="orbit-link-copy">
              <span className="orbit-link-label">{link.label}</span>
              <span className="orbit-link-description">{linkDescription(link)}</span>
            </span>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        ))}
      </section>

      <section className="status-panel" aria-label="Profile status">
        <div className="status-frame">
          <div className="status-inner">
            <div className="status-header">
              <h2>STATUS_LOG //</h2>
              <div className="status-lights" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div>
              <p>{profile.intro}</p>
              <p>
                Directory staged for tahayneh.com. Direct links are online and ready
                for the next transmission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer cosmic-footer">
        <div className="footer-orbits" aria-hidden="true">
          <Orbit size={20} />
          <span>@{profile.handle}</span>
          <Orbit size={20} />
        </div>
        <span>TRANSMISSION ENDED. // READY FOR DXB1.</span>
      </footer>
    </main>
  );
}
