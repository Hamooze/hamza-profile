import type { Profile } from "@/lib/profile-types";

export const DEFAULT_PROFILE: Profile = {
  displayName: "Hamza Tahayneh",
  handle: "Hamooze",
  tagline: "Software Dev and Network Cyber Security Systems Engineer",
  location: "UAE / Jordan",
  email: "hamzatahayneh@gmail.com",
  avatarUrl: "/profile-avatar.png",
  status: "Open to selected collaborations",
  intro: "A focused personal hub for work, code, socials, and direct contact.",
  links: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/Hamooze",
      kind: "github",
      featured: true
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/971529787138",
      kind: "whatsapp",
      featured: true
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/hamza-tahayneh-654710248",
      kind: "linkedin",
      featured: true
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/hamza.tahayneh",
      kind: "instagram",
      featured: false
    },
    {
      id: "barmous",
      label: "Barmous",
      url: "https://barmous.ae",
      kind: "website",
      featured: false
    }
  ]
};
