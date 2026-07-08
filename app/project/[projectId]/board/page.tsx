import { Board } from "@/components/kanban/board"
import { BoardHeader } from "@/components/kanban/board-header"
import { getProject, getProjectTasks } from "@/features/projects/data"

type BoardPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)
  const tasks = getProjectTasks(project.id)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <Board tasks={tasks} />
    </section>
  )
}
