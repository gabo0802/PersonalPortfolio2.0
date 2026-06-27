import React, { createContext, useContext, useEffect, useState } from "react";
import { Project, Experience, Skill } from "./types";
import { fetchAllData } from "./api";

type PortfolioData = {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  skillsBySlug: Record<string, Skill>;
  featuredSkills: Skill[];
};

type DataContextType = {
  data: PortfolioData | null;
  loading: boolean;
  error: Error | null;
};

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
});

export const usePortfolioData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAllData()
      .then((res) => {
        const skillsBySlug = Object.fromEntries(res.skills.map((s) => [s.slug, s]));
        const featuredSkills = res.skills.filter((s) => s.isFeatured);

        setData({
          projects: res.projects,
          experiences: res.experiences,
          skills: res.skills,
          skillsBySlug,
          featuredSkills,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
