import { projects, tasks } from "@/features/projects/data"

export function useSearch(query: string) {
  const value = query.toLowerCase()

  return {
    projects: projects.filter((project) => project.name.toLowerCase().includes(value)),
    tasks: tasks.filter((task) => task.title.toLowerCase().includes(value)),
  }
}
