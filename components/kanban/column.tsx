import type { Task } from "@/types/task"

import { TaskCard } from "./task-card"

export function Column({ title, tasks }: { title: string; tasks: Task[] }) {
  return (
    <section className="kanban-column">
      <header>
        <h3>{title}</h3>
        <span>{tasks.length}</span>
      </header>
      <div className="task-stack">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}
