import raw from "./projects.data.json";
import { Project, MediaItem, Skill } from "./types";
import { getSkillBySlug } from "./skills";

type RawProject = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  techSlugs?: string[];
  links?: { demo?: string | null; repo?: string | null };
  thumbnail?: string | null;
  gallery?: MediaItem[];
};

const isSkill = (s: Skill | undefined): s is Skill => s !== undefined;


function hydrateProject(p: RawProject): Project {
  const tech =
    p.techSlugs
      ?.map((slug) => {
        const skill = getSkillBySlug(slug);
        if (!skill) {
          console.warn(`Unknown skill slug "${slug}" in project "${p.slug}"`);
        }
        return skill;
      })
      .filter(isSkill) ?? [];

  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    description: p.description,
    tech: tech.length ? tech : undefined,
    links: p.links,
    thumbnail: p.thumbnail ?? null,
    gallery: p.gallery?.length ? p.gallery : undefined,
  };
}

export const projects: Project[] = (raw as RawProject[]).map(hydrateProject);

export const getAllProjects = (): Project[] => projects;

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
