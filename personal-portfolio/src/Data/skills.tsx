export type Skill = {
  slug: string;
  name: string;
  visual: string;
  proficiency: Proficiency;
};

export const enum Proficiency {
  Expert = "Expert", // 5+ years of experience
  Proficient = "Proficient", // 2-5 years of experience
  Experienced = "Experienced", // 1-2 years of experience
  Novice = "Novice", // 0-1 years of experience
  Exposed = "Exposed", // Have worked with the tool before a few times
};

// To order my proficiencies
export const proficiencyRank: Record<Proficiency, number> = {
  [Proficiency.Expert]: 5,
  [Proficiency.Proficient]: 4,
  [Proficiency.Experienced]: 3,
  [Proficiency.Novice]: 2,
  [Proficiency.Exposed]: 1
};

export const featuredSkills: Skill[] = [
  {
    slug: "cpp",
    name: "C++",
    visual:
      "https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=cplusplus&logoColor=white",
    proficiency: Proficiency.Proficient
  },
  {
    slug: "csharp",
    name: "C#",
    visual:
      "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white",
    proficiency: Proficiency.Experienced
  },
  {
    slug: "python",
    name: "Python",
    visual:
      "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    proficiency: Proficiency.Proficient
  },
  {
    slug: "java",
    name: "Java",
    visual:
      "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white",
    proficiency: Proficiency.Proficient
  },
  {
    slug: "typescript",
    name: "TypeScript",
    visual:
      "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
    proficiency: Proficiency.Experienced
  }
];

export const TemplateSkill: Skill = 
{
  slug: "template",
  name: "react",
  visual: "n/a",
  proficiency: Proficiency.Expert,
}