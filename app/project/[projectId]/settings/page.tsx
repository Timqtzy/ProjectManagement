import { BoardHeader } from "@/components/kanban/board-header"
import { getProject } from "@/features/projects/data"

type ProjectSettingsPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <div className="panel">Project metadata, members, and preferences will be managed here.</div>
    </section>
  )
}
