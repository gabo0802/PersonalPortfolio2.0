import raw from "./skills.data.json";
import { Proficiency, Skill } from "./types";

type RawSkill = Omit<Skill, "proficiency"> & { proficiency: string };

function isProficiency(v: string): v is Proficiency {
  return (Object.values(Proficiency) as string[]).includes(v);
}

export const skills: Skill[] = (raw as RawSkill[]).map((s) => {
  if (!isProficiency(s.proficiency)) {
    throw new Error(`Invalid proficiency "${s.proficiency}" for skill "${s.slug}"`);
  }
  return { ...s, proficiency: s.proficiency };
});

export const skillsBySlug: Record<string, Skill> = Object.fromEntries(
  skills.map((s) => [s.slug, s])
);

export function getSkillBySlug(slug: string): Skill | undefined {
  return skillsBySlug[slug];
}

// Preserves your current API expectations
export const featuredSkills: Skill[] = skills.filter((s) =>
  ["cpp", "csharp", "python", "java", "typescript"].includes(s.slug)
);

export const TemplateSkill: Skill =
  skillsBySlug["template"] ??
  ({
    slug: "template",
    name: "react",
    visual: "n/a",
    proficiency: Proficiency.Expert,
  } as Skill);

  // README-style grouping by slug (matches GitHub README categories) :contentReference[oaicite:1]{index=1}
export const skillGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Back-End",
    slugs: [
      "cpp",
      "java",
      "csharp",
      "dotnet",
      "python",
      "nodejs",
      "flask",
      "go",
    ],
  },
  {
    title: "Front-End",
    slugs: [
      "react",
      "angular",
      "materialui",
      "bootstrap",
      "html",
      "css",
      "sass",
      "javascript",
      "typescript",
      "tailwind",
      "figma",
      "androidstudio",
      "kotlin",
    ],
  },
  { title: "Database", slugs: ["mysql", "sqlite", "firebase"] },
  {
    title: "DevOps",
    slugs: ["docker", "kubernetes", "gcp", "jenkins", "githubactions"],
  },
  { title: "AI Tools", slugs: ["scikitlearn", "pytorch", "tensorflow"] },
  { title: "Version Control", slugs: ["git", "github", "gitlab"] },
  {
    title: "IDEs",
    slugs: ["vscode", "eclipse", "visualstudio", "clion", "intellij", "replit"],
  },
  {
    title: "Project Management",
    slugs: ["discord", "notion", "googletasks", "jira"],
  },
  {
    title: "Other Tools",
    slugs: [
      "markdown",
      "latex",
      "bash",
      "cmake",
      "matlab",
      "r",
      "unity",
      "godot",
    ],
  },
  { title: "Operating Systems", slugs: ["windows", "macos", "steamos"] },
];