import { BoardHeader } from "@/components/kanban/board-header"
import { getProject } from "@/features/projects/data"

type ProjectCalendarPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function ProjectCalendarPage({
  params,
}: ProjectCalendarPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <div className="panel">This project calendar will show dated tasks and milestones.</div>
    </section>
  )
}
