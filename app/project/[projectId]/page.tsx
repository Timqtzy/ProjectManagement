import { BoardHeader } from "@/components/kanban/board-header"
import { getProject, getProjectTasks } from "@/features/projects/data"

type ProjectPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)
  const tasks = getProjectTasks(project.id)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <div className="panel">
        <h3>{project.description}</h3>
        <p>{tasks.length} scoped tasks are ready across this project.</p>
      </div>
    </section>
  )
}
