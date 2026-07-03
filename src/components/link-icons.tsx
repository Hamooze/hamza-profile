import {
  BriefcaseBusiness,
  Camera,
  ExternalLink,
  GitFork,
  Globe2,
  Mail,
  MessageCircle,
  type LucideIcon
} from "lucide-react";
import type { LinkKind } from "@/lib/profile-types";

const ICONS: Record<LinkKind, LucideIcon> = {
  github: GitFork,
  linkedin: BriefcaseBusiness,
  instagram: Camera,
  whatsapp: MessageCircle,
  email: Mail,
  website: Globe2,
  other: ExternalLink
};

export function LinkIcon({ kind, size = 20 }: { kind: LinkKind; size?: number }) {
  const Icon = ICONS[kind] || ExternalLink;
  return <Icon aria-hidden="true" size={size} strokeWidth={2.2} />;
}
