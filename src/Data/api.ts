import { supabase } from "./supabaseClient";
import { Project, Experience, Skill, Proficiency, MediaItem } from "./types";

// Raw types as they come from Supabase
type RawSkill = {
  slug: string;
  name: string;
  visual: string;
  proficiency: string;
  category?: string;
  is_featured?: boolean;
};

type RawProject = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  links: { demo?: string | null; repo?: string | null };
  thumbnail: string | null;
  gallery: MediaItem[];
  project_skills: { skill_slug: string }[];
};

type RawExperience = {
  slug: string;
  title: string;
  subtitle: string | null;
  timeframe: string | null;
  description: string;
  order_index: number;
  experience_skills: { skill_slug: string }[];
};

export async function fetchAllData() {
  try {
    // Fetch all tables
    const [skillsRes, projectsRes, experiencesRes] = await Promise.all([
      supabase.from("skills").select("*"),
      supabase.from("projects").select("*, project_skills(skill_slug)").order("created_at", { ascending: false }),
      supabase.from("experiences").select("*, experience_skills(skill_slug)").order("order_index", { ascending: true }),
    ]);

    if (skillsRes.error || projectsRes.error || experiencesRes.error) {
      const err = skillsRes.error || projectsRes.error || experiencesRes.error;
      console.error("Supabase query error details:", err);
      throw new Error("Database query returned an error status.");
    }

    const rawSkills: RawSkill[] = skillsRes.data || [];
    const rawProjects: RawProject[] = projectsRes.data || [];
    const rawExperiences: RawExperience[] = experiencesRes.data || [];

    // Parse Skills
    const skills: Skill[] = rawSkills.map((s) => ({
      ...s,
      proficiency: s.proficiency as Proficiency,
    }));

    // Parse Projects
    const projects: Project[] = rawProjects.map((p) => {
      const techSlugs = p.project_skills?.map((ps) => ps.skill_slug) || [];
      const tech = techSlugs
        .map((slug) => skills.find((s) => s.slug === slug))
        .filter((s): s is Skill => s !== undefined);

      return {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        description: p.description,
        links: p.links,
        thumbnail: p.thumbnail,
        gallery: p.gallery,
        tech: tech.length > 0 ? tech : undefined,
      };
    });

    // Parse Experiences
    const experiences: Experience[] = rawExperiences.map((e) => {
      const techSlugs = e.experience_skills?.map((es) => es.skill_slug) || [];
      const tech = techSlugs
        .map((slug) => skills.find((s) => s.slug === slug))
        .filter((s): s is Skill => s !== undefined);

      return {
        slug: e.slug,
        title: e.title,
        subtitle: e.subtitle || undefined,
        timeframe: e.timeframe || undefined,
        description: e.description,
        tech: tech.length > 0 ? tech : undefined,
      };
    });

    return { skills, projects, experiences };
  } catch (error) {
    console.error("Failed to load portfolio data from Supabase:", error);
    // ponytail: custom user-facing error message when database is paused or unreachable
    throw new Error(
      "The back-end failed to load because it is paused due to lack of use. Please reach out to Gabe to reenable it."
    );
  }
}
