export type Experience = {
  title: string;
  subtitle?: string;
  timeframe?: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    subtitle: "Electronic Arts – SHIELD Team",
    timeframe: "Summer 2024",
    description:
      "Worked on Dungeon Keeper tooling and integrations, helping streamline QA and bulldogging workflows."
  },
  {
    title: "Teaching Assistant",
    subtitle: "Your University",
    timeframe: "2023 – 2024",
    description:
      "Supported students in data structures and algorithms, hosting office hours and grading assignments."
  }
];
