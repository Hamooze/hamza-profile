import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tahayneh.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hamza Tahayneh",
    template: "%s | Hamza Tahayneh"
  },
  description:
    "The personal profile hub for Hamza Tahayneh: work, code, socials, and direct contact.",
  openGraph: {
    title: "Hamza Tahayneh",
    description:
      "Work links, socials, code, and direct contact for Hamza Tahayneh.",
    url: siteUrl,
    siteName: "Hamza Tahayneh",
    images: [
      {
        url: "/profile-avatar.png",
        width: 512,
        height: 512,
        alt: "Hamza Tahayneh"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Tahayneh",
    description:
      "Work links, socials, code, and direct contact for Hamza Tahayneh.",
    images: ["/profile-avatar.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
