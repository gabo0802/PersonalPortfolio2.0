const fs = require("fs");
const path = require("path");

const repositoryRoot = path.resolve(__dirname, "..");
const backendRoot = path.join(repositoryRoot, "backend");
const backendDataRoot = path.join(backendRoot, "data");
const generatedRoot = path.join(repositoryRoot, "src", "generated", "backend");

const dataFiles = [
  "skills.json",
  "projects.json",
  "experiences.json",
  "project_skills.json",
  "experience_skills.json",
];

function requireFile(filePath, description) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error(
      `Missing ${description} at ${filePath}. Initialize the backend submodule and fetch its latest main branch.`,
    );
  }
}

if (!fs.existsSync(backendDataRoot) || !fs.statSync(backendDataRoot).isDirectory()) {
  throw new Error(
    `Missing backend data directory at ${backendDataRoot}. Initialize the backend submodule and fetch its latest main branch.`,
  );
}
dataFiles.forEach((fileName) => {
  requireFile(path.join(backendDataRoot, fileName), `backend snapshot file ${fileName}`);
});
requireFile(
  path.join(backendRoot, "GabrielCastejonSWE.pdf"),
  "canonical backend resume PDF",
);

fs.rmSync(generatedRoot, { recursive: true, force: true });
fs.mkdirSync(generatedRoot, { recursive: true });

dataFiles.forEach((fileName) => {
  fs.copyFileSync(
    path.join(backendDataRoot, fileName),
    path.join(generatedRoot, fileName),
  );
});
fs.copyFileSync(
  path.join(backendRoot, "GabrielCastejonSWE.pdf"),
  path.join(generatedRoot, "GabrielCastejonResume.pdf"),
);

console.log(`Prepared backend data and resume assets in ${generatedRoot}`);
