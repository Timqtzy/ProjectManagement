import Link from "next/link";
import { projects, tasks } from "@/features/projects/data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value; // fall back to raw string if not a parseable date

  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 7) return `Updated ${days}d ago`;
  return `Updated ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

export function DashboardOverview() {
  const activeTasks = tasks.filter((task) => task.status !== "done");
  const doneTasks = tasks.length - activeTasks.length;
  const completionRate =
    tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;

  return (
    <section className="page-stack">
      <div className="section-heading">
        <p className="eyebrow">Today</p>
        <h2>Dashboard</h2>
      </div>

      <dl className="metrics-grid">
        <div className="metric">
          <dt>Active projects</dt>
          <dd>
            <strong>{projects.length}</strong>
          </dd>
        </div>
        <div className="metric">
          <dt>Open tasks</dt>
          <dd>
            <strong>{activeTasks.length}</strong>
          </dd>
        </div>
        <div className="metric">
          <dt>Completion rate</dt>
          <dd>
            <strong>{completionRate}%</strong>
            <div className="metric-bar" role="presentation">
              <div
                className="metric-bar-fill"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </dd>
        </div>
      </dl>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet.</p>
          <span>Create one to see it show up here.</span>
        </div>
      ) : (
        <ul className="project-grid">
          {projects.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.projectId === project.id,
            );
            const openCount = projectTasks.filter(
              (task) => task.status !== "done",
            ).length;

            return (
              <li key={project.id}>
                <Link className="project-card" href={`/project/${project.id}`}>
                  <div className="project-card-top">
                    <span className="project-avatar" aria-hidden="true">
                      {getInitials(project.name)}
                    </span>
                    <span className="status-badge" data-status={project.status}>
                      {project.status}
                    </span>
                  </div>

                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="project-card-footer">
                    <span>
                      {project.taskCount} tasks
                      {projectTasks.length > 0 && ` · ${openCount} open`}
                    </span>
                    <time dateTime={project.updatedAt}>
                      {formatUpdatedAt(project.updatedAt)}
                    </time>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
