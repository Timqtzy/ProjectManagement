import type { TaskPriority, TaskStatus } from "@/types/task"

export type TaskInput = {
  title: string
  status: TaskStatus
  priority: TaskPriority
}
