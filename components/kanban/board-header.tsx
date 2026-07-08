import Link from "next/link"

import { projectViews } from "@/features/projects/data"

export function BoardHeader({ projectName }: { projectName: string }) {
  return (
    <div className="project-header">
      <div>
        <p className="eyebrow">Project</p>
        <h2>{projectName}</h2>
      </div>
      <nav className="view-tabs" aria-label="Project views">
        {projectViews.map((view) => (
          <Link key={view.href} href={view.href}>
            {view.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
