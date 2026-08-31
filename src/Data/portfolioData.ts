import { Experience, MediaItem, Proficiency, Project, Skill } from "./types";

export type RawSkill = {
  slug: string;
  name: string;
  visual: string;
  proficiency: string;
  category?: string | null;
  is_featured?: boolean | null;
};

export type RawProjectSkill = {
  project_slug: string;
  skill_slug: string;
};

export type RawProject = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  links: { demo?: string | null; repo?: string | null } | null;
  thumbnail: string | null;
  gallery: MediaItem[];
  project_skills?: { skill_slug: string }[];
};

export type RawExperienceSkill = {
  experience_slug: string;
  skill_slug: string;
};

export type RawExperience = {
  slug: string;
  title: string;
  subtitle: string | null;
  timeframe: string | null;
  description: string;
  order_index: number;
  experience_skills?: { skill_slug: string }[];
};

export type RawPortfolioSnapshot = {
  skills: RawSkill[];
  projects: RawProject[];
  experiences: RawExperience[];
  project_skills: RawProjectSkill[];
  experience_skills: RawExperienceSkill[];
};

export type PortfolioDataPayload = {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
};

function isProficiency(value: string): value is Proficiency {
  return (Object.values(Proficiency) as string[]).includes(value);
}

function addRelationship(
  relationships: Map<string, string[]>,
  parentSlug: string,
  skillSlug: string,
): void {
  const skillSlugs = relationships.get(parentSlug) ?? [];
  if (!skillSlugs.includes(skillSlug)) {
    skillSlugs.push(skillSlug);
  }
  relationships.set(parentSlug, skillSlugs);
}

function createRelationshipMap(
  snapshot: RawPortfolioSnapshot,
): {
  projectSkills: Map<string, string[]>;
  experienceSkills: Map<string, string[]>;
} {
  const projectSkills = new Map<string, string[]>();
  const experienceSkills = new Map<string, string[]>();

  snapshot.project_skills.forEach((relationship) => {
    addRelationship(projectSkills, relationship.project_slug, relationship.skill_slug);
  });
  snapshot.projects.forEach((project) => {
    project.project_skills?.forEach((relationship) => {
      addRelationship(projectSkills, project.slug, relationship.skill_slug);
    });
  });

  snapshot.experience_skills.forEach((relationship) => {
    addRelationship(
      experienceSkills,
      relationship.experience_slug,
      relationship.skill_slug,
    );
  });
  snapshot.experiences.forEach((experience) => {
    experience.experience_skills?.forEach((relationship) => {
      addRelationship(experienceSkills, experience.slug, relationship.skill_slug);
    });
  });

  return { projectSkills, experienceSkills };
}

export function normalizePortfolioData(
  snapshot: RawPortfolioSnapshot,
): PortfolioDataPayload {
  const skills: Skill[] = snapshot.skills.map((skill): Skill => {
    if (!isProficiency(skill.proficiency)) {
      throw new Error(
        `Invalid proficiency "${skill.proficiency}" for skill "${skill.slug}"`,
      );
    }

    return {
      slug: skill.slug,
      name: skill.name,
      visual: skill.visual,
      proficiency: skill.proficiency,
      category: skill.category ?? undefined,
      isFeatured: skill.is_featured ?? undefined,
    };
  });

  const skillsBySlug = new Map(skills.map((skill) => [skill.slug, skill]));
  const { projectSkills, experienceSkills } = createRelationshipMap(snapshot);

  const projects = snapshot.projects.map((project) => {
    const tech = (projectSkills.get(project.slug) ?? [])
      .map((skillSlug) => skillsBySlug.get(skillSlug))
      .filter((skill): skill is Skill => skill !== undefined);

    return {
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      description: project.description,
      links: project.links ?? undefined,
      thumbnail: project.thumbnail,
      gallery: project.gallery,
      tech: tech.length > 0 ? tech : undefined,
    };
  });

  const experiences = snapshot.experiences.map((experience): Experience => {
    const tech = (experienceSkills.get(experience.slug) ?? [])
      .map((skillSlug) => skillsBySlug.get(skillSlug))
      .filter((skill): skill is Skill => skill !== undefined);

    return {
      slug: experience.slug,
      title: experience.title,
      subtitle: experience.subtitle ?? undefined,
      timeframe: experience.timeframe ?? undefined,
      description: experience.description,
      tech: tech.length > 0 ? tech : undefined,
    };
  });

  return { skills, projects, experiences };
}
