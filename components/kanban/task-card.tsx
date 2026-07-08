import type { Task } from "@/types/task"

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="task-card">
      <span data-priority={task.priority}>{task.priority}</span>
      <h4>{task.title}</h4>
      {task.dueDate ? <small>{task.dueDate}</small> : null}
    </article>
  )
}
