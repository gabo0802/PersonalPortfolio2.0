# Gabriel Castejon — Personal Portfolio

A responsive React + TypeScript portfolio site showcasing experience, projects, skills, and resume.

## Stack

- React 18 + TypeScript
- React Router
- React Bootstrap
- Tailwind utility classes
- CSS variable-based theming

## Features

- Multi-page layout: Home, About, Projects
- Global route transitions between sections
- Mobile-first responsive behavior (including hamburger navigation)
- Data-driven projects and experience timelines
- Skills modal and project media gallery support
- Resume preview + download flow

## Project Structure

```text
src/
	Components/
		Header/
			Header.tsx
			Footer.tsx
		Pages/
			MainPage.tsx
			AboutMe.tsx
			ProjectsPage.tsx
		Project.tsx
	Data/
		projects.data.json
		experiences.data.json
		skills.data.json
		projects.ts
		experiences.ts
		skills.ts
		types.ts
	Assets/
		images/
		docs/
	themes.css
	index.css
	App.tsx
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm start
```

### 3) Build for production

```bash
npm run build
```

## Content Management

Most editable content is data-driven:

- Projects: `src/Data/projects.data.json`
- Experience timeline: `src/Data/experiences.data.json`
- Skills and grouping: `src/Data/skills.data.json` and `src/Data/skills.ts`

After updating data files, the UI will reflect changes automatically through the typed adapters in `src/Data/*.ts`.

## Theming

Global visual tokens live in:

- `src/themes.css`

Page and component styling then consume those CSS variables for gradients, glass surfaces, text contrast, and section transitions.

## Routing

The app uses `HashRouter` in `src/index.tsx`, which is friendly for static hosting environments.

## Notes

- Resume preview PDF is loaded from `src/Assets/docs/`.
- External media (thumbnails/gallery assets) are loaded from configured URLs in project data.
