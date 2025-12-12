import { Skill, TemplateSkill } from "./skills"

export type MediaItem = {
  url: string;               // absolute or relative (prefer raw file URLs)
  caption?: string;
  type?: "image" | "video";  // optional; will be inferred from extension if omitted
  thumbnailUrl?: string;     // optional: use a smaller preview for performance
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech?: Skill[];
  links?: { demo?: string | null; repo?: string | null };
  thumbnail?: string | null; // main image
  gallery?: MediaItem[];     // extra media shown at the bottom of detail page
};


// TODO: This can be more data driven so that we pull it from a DB back-end, but there is support for it here in the front-end
export const projects: Project[] = [
  {
    slug: "dungeon-keeper-tools",
    title: "Dungeon Keeper Tools",
    summary: "Internal tooling to speed up integrations.",
    description:
      "Built automation and integration helpers for the SHIELD team to streamline QA and bulldogging workflows.",
    tech: [TemplateSkill],
    links: { repo: "https://github.com/your/repo", demo: null },
    thumbnail:
      "https://raw.githubusercontent.com/your/repo/main/assets/dk-tools/cover.png",
    gallery: [
      {
        url: "https://raw.githubusercontent.com/your/repo/main/assets/dk-tools/screen-1.png",
        caption: "Integration dashboard"
      },
      {
        url: "https://raw.githubusercontent.com/your/repo/main/assets/dk-tools/screen-2.png",
        caption: "Automation queue"
      },
      {
        url: "https://raw.githubusercontent.com/your/repo/main/assets/dk-tools/demo.mp4",
        caption: "Short walkthrough",
        type: "video",
        thumbnailUrl:
          "https://raw.githubusercontent.com/your/repo/main/assets/dk-tools/demo-thumb.jpg"
      }
    ]
  },
  {
    slug: "portfolio-site",
    title: "Personal Portfolio",
    summary: "Responsive portfolio with project detail routing.",
    description:
      "Showcases projects with clean UI and dynamic routing using React Router and TailwindCSS.",
    tech: [TemplateSkill],
    links: {
      demo: "https://your-site.example",
      repo: "https://github.com/your/portfolio"
    },
    thumbnail:
      "https://raw.githubusercontent.com/your/portfolio/main/public/cover.jpg",
    gallery: [
      { url: "https://raw.githubusercontent.com/your/portfolio/main/public/hero.png", caption: "Landing" },
      { url: "https://raw.githubusercontent.com/your/portfolio/main/public/projects-grid.png", caption: "Projects grid" }
    ]
  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const getAllProjects = () => projects;
