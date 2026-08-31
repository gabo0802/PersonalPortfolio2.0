jest.mock("./Data/supabaseClient", () => ({ supabase: null }));

import { fetchAllData } from "./Data/api";

test("loads the bundled snapshot when Supabase is unavailable", async () => {
  const data = await fetchAllData();

  expect(data.skills).toHaveLength(58);
  expect(data.projects).toHaveLength(6);
  expect(data.experiences).toHaveLength(8);
  expect(data.projects[0].tech?.length).toBeGreaterThan(0);
  expect(data.experiences[0].slug).toBe("software-engineer-ea");
});
