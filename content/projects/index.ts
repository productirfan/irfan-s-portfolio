import { aiCalling } from "./ai-calling";
import { auriga } from "./auriga";
import { concentio } from "./concentio";
import type { Project } from "../types";

export const projects: Project[] = [auriga, aiCalling, concentio];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const current = getProject(slug);
  if (!current) return projects[0];
  return getProject(current.nextProject) ?? projects[0];
}

export function getPrevProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index <= 0) return projects[projects.length - 1];
  return projects[index - 1];
}

export function formatIndex(index: number) {
  return String(index).padStart(2, "0");
}
