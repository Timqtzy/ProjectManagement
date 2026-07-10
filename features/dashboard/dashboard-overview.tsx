import Link from "next/link";
import { FolderKanban, ListTodo, TrendingUp } from "lucide-react";
import { projects, tasks } from "@/features/projects/data";
import StatsProps from "@/components/ui/stats";
import ScrollItem from "@/components/ui/scroll-item";

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

const STAT_CARDS = [
    { key: "projects", icon: FolderKanban, tint: "bg-indigo-500/10 text-indigo-400" },
    { key: "tasks", icon: ListTodo, tint: "bg-amber-500/10 text-amber-400" },
    { key: "rate", icon: TrendingUp, tint: "bg-emerald-500/10 text-emerald-400" },
] as const;

export function DashboardOverview() {
    const activeTasks = tasks.filter((task) => task.status !== "done");
    const doneTasks = tasks.length - activeTasks.length;
    const completionRate =
        tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;

    const statValues = {
        projects: projects.length,
        tasks: activeTasks.length,
        rate: completionRate,
    };

    const statLabels = {
        projects: "Active Projects",
        tasks: "Open tasks",
        rate: "Completion rate",
    };

    return (
        <section className="page-stack mx-auto max-w-7xl">
            <div className="section-heading px-4 pb-5">
                <h1 className="text-2xl">Dashboard</h1>
            </div>

            <dl className="metrics-grid grid grid-cols-1 gap-4 sm:grid-cols-3 px-4 py-2">
                {STAT_CARDS.map(({ key, icon: Icon, tint }) => (
                    <div
                        key={key}
                        className="metric rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]"
                    >
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
                        <div className="mt-4">
                            <StatsProps label={statLabels[key]} value={statValues[key]} />
                        </div>
                    </div>
                ))}
            </dl>

            {projects.length === 0 ? (
                <div className="empty-state rounded-xl border border-dashed border-white/15 px-6 py-12 text-center">
                    <p className="font-medium">No projects yet.</p>
                    <span className="text-sm text-neutral-500">
            Create one to see it show up here.
          </span>
                </div>
            ) : (
                <ul className="project-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 py-2">
                    {projects.map((project) => {
                        const projectTasks = tasks.filter(
                            (task) => task.projectId === project.id,
                        );
                        const openCount = projectTasks.filter(
                            (task) => task.status !== "done",
                        ).length;

                        return (
                            <li key={project.id}>
                                <Link
                                    className="project-card flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                                    href={`/project/${project.id}`}
                                >
                                    <div className="project-card-top flex items-center justify-between">
                    <span
                        className="project-avatar flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-semibold text-indigo-400"
                        aria-hidden="true"
                    >
                      {getInitials(project.name)}
                    </span>
                                        <span
                                            className="status-badge rounded-full px-2.5 py-1 text-xs font-medium capitalize data-[status=active]:bg-emerald-500/10 data-[status=active]:text-emerald-400 data-[status=paused]:bg-amber-500/10 data-[status=paused]:text-amber-400 data-[status=done]:bg-white/10 data-[status=done]:text-neutral-400"
                                            data-status={project.status}
                                        >
                      {project.status}
                    </span>
                                    </div>

                                    <h3 className="mt-4 font-semibold">{project.name}</h3>
                                    <p className="mt-1.5 line-clamp-2 text-sm text-neutral-400">
                                        {project.description}
                                    </p>

                                    <div className="project-card-footer mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-neutral-500">
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
            <ScrollItem/>
        </section>
    );
}