import { BoardHeader } from "@/components/kanban/board-header"
import { getProject } from "@/features/projects/data"

type FilesPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function FilesPage({ params }: FilesPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <div className="panel">Project attachments and uploaded reference files will live here.</div>
    </section>
  )
}
