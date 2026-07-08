export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export type Task = {
  id: string
  projectId: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
}
