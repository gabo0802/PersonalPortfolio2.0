export type Skill = {
  slug: string;
  name: string;
  proficiency: Proficiency;
};

export const enum Proficiency {
  Expert = "Expert", // 5+ years of experience
  Proficient = "Proficient", // 2-5 years of experience
  Experienced = "Experienced", // 1-2 years of experience
  Novice = "Novice", // 0-1 years of experience
  Exposed = "Exposed", // Have worked with the tool before a few times
};

export const TemplateSkill: Skill = 
{
  slug: "template",
  name: "react",
  proficiency: Proficiency.Expert,
}