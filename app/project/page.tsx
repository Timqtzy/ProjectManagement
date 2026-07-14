"use client";

import { Plus, Code2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  icon: React.ReactNode;
  statusColor: string;
}

//sample data for projects btw status color is just a color for the status indicator, not an actual status
const projects: Project[] = [
  {
    id: "artikulo",
    name: "Artikulo",
    icon: <Code2 className="h-4 w-4" />,
    statusColor: "bg-amber-400",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen mx-auto max-w-7xl px-8 py-12 text-white">
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-2">
        <div>
          <h1 className="font-serif text-2xl italic text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-indigo-300/70">
            Configure code repositories, pipelines, websites, or homelab structures.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0a0a0d] transition-opacity hover:opacity-90 hover:cursor-pointer"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New Project
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Project cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0e0e12] p-5"
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/40 text-amber-400">
                {project.icon}
              </div>
              <h2 className="mt-4 text-base font-semibold text-white">
                {project.name}
              </h2>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200 hover:cursor-pointer"
              >
                Open Workspace
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
              <span
                className={`h-1.5 w-1.5 rounded-full ${project.statusColor}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}