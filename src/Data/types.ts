// --------------------
// Skills
// --------------------
export type Skill = {
  slug: string;
  name: string;
  visual: string;
  proficiency: Proficiency;
};

export enum Proficiency {
  Expert = "Expert",
  Proficient = "Proficient",
  Experienced = "Experienced",
  Novice = "Novice",
  Exposed = "Exposed",
}

export const proficiencyRank: Record<Proficiency, number> = {
  [Proficiency.Expert]: 5,
  [Proficiency.Proficient]: 4,
  [Proficiency.Experienced]: 3,
  [Proficiency.Novice]: 2,
  [Proficiency.Exposed]: 1,
};

// --------------------
// Projects
// --------------------
export type MediaItem = {
  url: string;
  caption?: string;
  type?: "image" | "video";
  thumbnailUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech?: Skill[];
  links?: { demo?: string | null; repo?: string | null };
  thumbnail?: string | null;
  gallery?: MediaItem[];
};

// --------------------
// Experiences
// --------------------
export type Experience = {
  title: string;
  subtitle?: string;
  timeframe?: string;
  description: string;
};
