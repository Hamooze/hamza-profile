import { promises as fs } from "node:fs";
import path from "node:path";
import { DEFAULT_PROFILE } from "@/data/default-profile";
import type { Profile } from "@/lib/profile-types";
import { sanitizeProfile } from "@/lib/profile-validation";

const LOCAL_PROFILE_PATH = path.join(process.cwd(), "data", "profile.json");

export async function getProfile(): Promise<Profile> {
  try {
    const raw = await fs.readFile(LOCAL_PROFILE_PATH, "utf8");
    return sanitizeProfile(JSON.parse(raw));
  } catch {
    return DEFAULT_PROFILE;
  }
}
