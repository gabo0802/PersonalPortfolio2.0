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

All site content is dynamic and loaded from a **Supabase database** via the client in `src/Data/api.ts`:

- **Projects**: Stored in the `projects` table (with links, thumbnail, gallery details).
- **Experience Timeline**: Stored in the `experiences` table (ordered by `order_index`).
- **Skills & Grouping**: Stored in the `skills` table, with categories managed via the `category` column and home page featured status managed via the `is_featured` column.

Changes updated in Supabase reflect in the UI automatically. Static fallback data and files in `src/Data/` remain for reference/seed purposes.

## Theming

Global visual tokens live in:

- `src/themes.css`

Page and component styling then consume those CSS variables for gradients, glass surfaces, text contrast, and section transitions.

## Routing

The app uses `HashRouter` in `src/index.tsx`, which is friendly for static hosting environments.

## Notes

- Resume preview PDF is loaded from `src/Assets/docs/`.
- External media (thumbnails/gallery assets) are loaded from configured URLs in project data.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
