import { supabase } from "./supabaseClient";
import { Project, Experience, Skill, Proficiency, MediaItem } from "./types";

// Raw types as they come from Supabase
type RawSkill = {
  slug: string;
  name: string;
  visual: string;
  proficiency: string;
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
  title: string;
  subtitle: string | null;
  timeframe: string | null;
  description: string;
  order_index: number;
};

export async function fetchAllData() {
  // Fetch all tables
  const [skillsRes, projectsRes, experiencesRes] = await Promise.all([
    supabase.from("skills").select("*"),
    supabase.from("projects").select("*, project_skills(skill_slug)"),
    supabase.from("experiences").select("*").order("order_index", { ascending: true }),
  ]);

  if (skillsRes.error) console.error("Error fetching skills:", skillsRes.error);
  if (projectsRes.error) console.error("Error fetching projects:", projectsRes.error);
  if (experiencesRes.error) console.error("Error fetching experiences:", experiencesRes.error);

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
  const experiences: Experience[] = rawExperiences.map((e) => ({
    title: e.title,
    subtitle: e.subtitle || undefined,
    timeframe: e.timeframe || undefined,
    description: e.description,
  }));

  return { skills, projects, experiences };
}
