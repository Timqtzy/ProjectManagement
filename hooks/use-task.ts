import { tasks } from "@/features/projects/data"

export function useTask(taskId: string) {
  return tasks.find((task) => task.id === taskId)
}
