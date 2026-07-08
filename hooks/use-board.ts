import { tasks } from "@/features/projects/data"

export function useBoard(projectId: string) {
  return tasks.filter((task) => task.projectId === projectId)
}
