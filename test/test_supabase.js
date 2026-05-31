require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log('Missing env variables');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  console.log('Testing skills query...');
  const skillsRes = await supabase.from("skills").select("*");
  if (skillsRes.error) console.error("Skills error:", skillsRes.error);
  else console.log("Fetched skills:", skillsRes.data.length);

  console.log('Testing projects query...');
  const projectsRes = await supabase.from("projects").select("*, project_skills(skill_slug)").order("created_at", { ascending: false });
  if (projectsRes.error) console.error("Projects error:", projectsRes.error);
  else console.log("Fetched projects:", projectsRes.data.length);

  console.log('Testing experiences query...');
  const experiencesRes = await supabase.from("experiences").select("*, experience_skills(skill_slug)").order("order_index", { ascending: true });
  if (experiencesRes.error) console.error("Experiences error:", experiencesRes.error);
  else console.log("Fetched experiences:", experiencesRes.data.length);
}

test();
