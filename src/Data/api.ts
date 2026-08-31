import fallbackExperiences from "../generated/backend/experiences.json";
import fallbackExperienceSkills from "../generated/backend/experience_skills.json";
import fallbackProjects from "../generated/backend/projects.json";
import fallbackProjectSkills from "../generated/backend/project_skills.json";
import fallbackSkills from "../generated/backend/skills.json";
import {
  normalizePortfolioData,
  RawExperience,
  RawExperienceSkill,
  RawPortfolioSnapshot,
  RawProject,
  RawProjectSkill,
  RawSkill,
} from "./portfolioData";
import { supabase } from "./supabaseClient";

const FALLBACK_TIMEOUT_MS = 4000;

const fallbackSnapshot: RawPortfolioSnapshot = {
  skills: fallbackSkills as RawSkill[],
  projects: fallbackProjects as RawProject[],
  experiences: fallbackExperiences as RawExperience[],
  project_skills: fallbackProjectSkills as RawProjectSkill[],
  experience_skills: fallbackExperienceSkills as RawExperienceSkill[],
};

async function fetchFromSupabase(signal: AbortSignal) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const [skillsRes, projectsRes, experiencesRes] = await Promise.all([
    supabase.from("skills").select("*").abortSignal(signal),
    supabase
      .from("projects")
      .select("*, project_skills(skill_slug)")
      .order("created_at", { ascending: false })
      .abortSignal(signal),
    supabase
      .from("experiences")
      .select("*, experience_skills(skill_slug)")
      .order("order_index", { ascending: true })
      .abortSignal(signal),
  ]);

  const error = skillsRes.error || projectsRes.error || experiencesRes.error;
  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  if (
    !Array.isArray(skillsRes.data) ||
    !Array.isArray(projectsRes.data) ||
    !Array.isArray(experiencesRes.data)
  ) {
    throw new Error("Supabase returned an incomplete portfolio response.");
  }

  return normalizePortfolioData({
    skills: skillsRes.data as RawSkill[],
    projects: projectsRes.data as RawProject[],
    experiences: experiencesRes.data as RawExperience[],
    project_skills: [],
    experience_skills: [],
  });
}

async function fetchFromSupabaseWithDeadline() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FALLBACK_TIMEOUT_MS);

  try {
    return await fetchFromSupabase(controller.signal);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchAllData() {
  try {
    return await fetchFromSupabaseWithDeadline();
  } catch (primaryError) {
    const reason =
      primaryError instanceof Error ? primaryError.message : String(primaryError);
    console.warn(
      `Supabase portfolio request failed; using the bundled snapshot instead: ${reason}`,
    );

    try {
      return normalizePortfolioData(fallbackSnapshot);
    } catch (fallbackError) {
      console.error("The bundled portfolio snapshot is invalid.", fallbackError);
      throw new Error("Portfolio data is temporarily unavailable.");
    }
  }
}
