import { BoardHeader } from "@/components/kanban/board-header"
import { getProject, getProjectTasks } from "@/features/projects/data"

type ListPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function ListPage({ params }: ListPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)
  const tasks = getProjectTasks(project.id)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <div className="list-panel">
        {tasks.map((task) => (
          <div className="list-row" key={task.id}>
            <strong>{task.title}</strong>
            <span>{task.status}</span>
            <small>{task.dueDate}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
