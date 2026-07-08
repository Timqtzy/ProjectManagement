import { projects } from "@/features/projects/data"

export function useProject(projectId: string) {
  return projects.find((project) => project.id === projectId)
}
