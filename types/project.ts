export type ProjectStatus = "planning" | "active" | "paused" | "done"

export type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  taskCount: number
  updatedAt: string
}

export type ProjectView = {
  name: string
  href: string
}
