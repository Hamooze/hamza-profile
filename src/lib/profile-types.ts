export type LinkKind =
  | "github"
  | "linkedin"
  | "instagram"
  | "whatsapp"
  | "email"
  | "website"
  | "other";

export type ProfileLink = {
  id: string;
  label: string;
  url: string;
  kind: LinkKind;
  featured: boolean;
};

export type Profile = {
  displayName: string;
  handle: string;
  tagline: string;
  location: string;
  email: string;
  avatarUrl: string;
  status: string;
  intro: string;
  links: ProfileLink[];
};
