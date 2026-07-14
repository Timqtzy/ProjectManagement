import Link from "next/link";
import {
    FolderKanban,
    ListTodo,
    CalendarClock,
    CheckCircle2,
    Clock,
} from "lucide-react";
import { projects, tasks } from "@/features/projects/data";
// import StatsProps from "@/components/ui/stats";
import ScrollItem from "@/components/ui/scroll-item";


type Note = {
    id: string;
    title: string;
    updatedAt: string;
};

const notes: Note[] = [
    { id: "note-1", title: "Test", updatedAt: "2026-07-06" },
];

type ActivityEntry = {
    id: string;
    message: string;
    timestamp: string; // ISO datetime
};

//sample data
const activityLog: ActivityEntry[] = [
    { id: "a1", message: 'Moved "Tasj1" from todo to review', timestamp: "2026-07-11T19:11:00" },
    { id: "a2", message: 'Moved "Tasj1" from backlog to todo', timestamp: "2026-07-11T19:11:00" },
    { id: "a3", message: "Uploaded attachment: Spin-Refill-Laundry-Hub6-and-7.docx", timestamp: "2026-07-11T19:07:00" },
    { id: "a4", message: 'Updated note: "Test"', timestamp: "2026-07-11T19:06:00" },
    { id: "a5", message: 'Updated note: "Tes"', timestamp: "2026-07-11T19:06:00" },
    { id: "a6", message: 'Updated note: "Te"', timestamp: "2026-07-11T19:06:00" },
];

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

function formatDueDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 10); // YYYY-MM-DD, matches the "2026-07-15" style badge
}

function formatTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

const STAT_CARDS = [
    { key: "projects", icon: FolderKanban, tint: "bg-indigo-500/10 text-indigo-400" },
    { key: "pending", icon: ListTodo, tint: "bg-amber-500/10 text-amber-400" },
    { key: "dueToday", icon: CalendarClock, tint: "bg-rose-500/10 text-rose-400" },
    { key: "completed", icon: CheckCircle2, tint: "bg-emerald-500/10 text-emerald-400" },
] as const;

export function DashboardOverview() {
    const today = new Date();
    const in7Days = new Date(today.getTime() + 7 * 86_400_000);

    const activeTasks = tasks.filter((task) => task.status !== "done");
    const doneTasks = tasks.length - activeTasks.length;
    const completionRate =
        tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;

    const dueTodayCount = tasks.filter(
        (task) => task.dueDate && isSameDay(new Date(task.dueDate), today),
    ).length;

    const upcomingTasks = tasks
        .filter(
            (task): task is typeof task & { dueDate: string } => {
                if (!task.dueDate || task.status === "done") return false;
                const due = new Date(task.dueDate);
                return due >= today && due <= in7Days;
            },
        )
        .sort(
            (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        );

    const statValues = {
        projects: projects.length,
        pending: activeTasks.length,
        dueToday: dueTodayCount,
        completed: doneTasks,
    };

    const statLabels = {
        projects: "Active Projects",
        pending: "Pending Tasks",
        dueToday: "Due Today",
        completed: "Completed Tasks",
    };

    const formattedToday = today.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return (
        <section className="page-stack min-h-screen mx-auto max-w-7xl px-8 py-12">
            <div className="section-heading flex items-start justify-between gap-4 px-4 pb-5">
                <div>
                    <h1 className="font-serif text-2xl italic text-white">
                        Personal Workspace
                    </h1>
                    <p className="mt-1 text-sm text-neutral-400">
                        Welcome back. Here is your engineering dashboard for today,{" "}
                        {formattedToday}.
                    </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    Time tracked: 0m
                </span>
            </div>

            <dl className="metrics-grid grid grid-cols-2 gap-4 px-4 py-2 sm:grid-cols-4">
                {STAT_CARDS.map(({ key, icon: Icon, tint }) => (
                    <div
                        key={key}
                        className="metric rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]"
                    >
                        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}>
                            <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="mt-4">
                            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                                {statLabels[key]}
                            </p>
                            <p className="mt-1 text-2xl font-semibold text-white">
                                {statValues[key]}
                                {key === "completed" && tasks.length > 0 && (
                                    <span className="ml-1.5 text-sm font-normal text-neutral-500">
                                        / {tasks.length} ({completionRate}%)
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </dl>

            <div className="grid grid-cols-1 gap-4 px-4 py-2 lg:grid-cols-3">
                {/* Left / main column */}
                <div className="flex flex-col gap-4 lg:col-span-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-serif text-lg italic text-white">
                                Upcoming (Next 7 Days)
                            </h2>
                            <span className="text-xs text-neutral-500">
                                {upcomingTasks.length} tasks scheduled
                            </span>
                        </div>

                        {upcomingTasks.length === 0 ? (
                            <p className="mt-4 text-sm text-neutral-500">
                                Nothing due in the next 7 days.
                            </p>
                        ) : (
                            <ul className="mt-4 flex flex-col gap-2">
                                {upcomingTasks.map((task) => {
                                    const project = projects.find(
                                        (p) => p.id === task.projectId,
                                    );
                                    return (
                                        <li
                                            key={task.id}
                                            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="h-1.5 w-1.5 rounded-full bg-amber-400"
                                                    aria-hidden="true"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        {task.title}
                                                    </p>
                                                    {project && (
                                                        <p className="text-xs text-neutral-500">
                                                            {project.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-neutral-400">
                                                {formatDueDate(task.dueDate)}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <div>
                        <h2 className="font-serif px-1 pb-3 text-lg italic text-white">
                            Recent Projects
                        </h2>

                        {projects.length === 0 ? (
                            <div className="empty-state rounded-xl border border-dashed border-white/15 px-6 py-12 text-center">
                                <p className="font-medium">No projects yet.</p>
                                <span className="text-sm text-neutral-500">
                                    Create one to see it show up here.
                                </span>
                            </div>
                        ) : (
                            <ul className="project-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {projects.map((project) => {
                                    const projectTasks = tasks.filter(
                                        (task) => task.projectId === project.id,
                                    );
                                    const openCount = projectTasks.filter(
                                        (task) => task.status !== "done",
                                    ).length;
                                    const doneCount = projectTasks.length - openCount;
                                    const projectRate =
                                        projectTasks.length > 0
                                            ? Math.round((doneCount / projectTasks.length) * 100)
                                            : 0;

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
                                                    <span>Progress</span>
                                                    <span>
                                                        {doneCount}/{projectTasks.length} ({projectRate}%)
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right / side column */}
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-serif text-lg italic text-white">
                                Recent Notes
                            </h2>
                            <Link
                                href="/notes"
                                className="text-xs font-medium text-amber-400 hover:text-amber-300"
                            >
                                View Notes
                            </Link>
                        </div>

                        {notes.length === 0 ? (
                            <p className="mt-4 text-sm text-neutral-500">No notes yet.</p>
                        ) : (
                            <ul className="mt-4 flex flex-col gap-2">
                                {notes.map((note) => (
                                    <li
                                        key={note.id}
                                        className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
                                    >
                                        <p className="text-sm font-medium text-white">
                                            {note.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-neutral-500">
                                            {formatUpdatedAt(note.updatedAt)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                        <h2 className="font-serif text-lg italic text-white">
                            Activity Log
                        </h2>

                        {activityLog.length === 0 ? (
                            <p className="mt-4 text-sm text-neutral-500">
                                No activity yet.
                            </p>
                        ) : (
                            <ul className="mt-4 flex max-h-96 flex-col gap-4 overflow-y-auto pr-1">
                                {activityLog.map((entry) => (
                                    <li key={entry.id} className="flex gap-3">
                                        <span
                                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <p className="text-sm text-indigo-300">
                                                {entry.message}
                                            </p>
                                            <p className="mt-0.5 text-xs text-neutral-500">
                                                {formatTime(entry.timestamp)}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}