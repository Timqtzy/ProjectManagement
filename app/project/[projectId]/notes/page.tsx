import { BoardHeader } from "@/components/kanban/board-header"
import { getProject } from "@/features/projects/data"

type NotesPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { projectId } = await params
  const project = getProject(projectId)

  return (
    <section className="page-stack">
      <BoardHeader projectName={project.name} />
      <div className="panel">Meeting notes, decisions, and project thinking will live here.</div>
    </section>
  )
}
