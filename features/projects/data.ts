import type { Project, ProjectView } from "@/types/project";
import type { Task } from "@/types/task";

export const projectViews: ProjectView[] = [
  { name: "Overview", href: "/project/personal-os" },
  { name: "Board", href: "/project/personal-os/board" },
  { name: "List", href: "/project/personal-os/list" },
  { name: "Calendar", href: "/project/personal-os/calendar" },
  { name: "Notes", href: "/project/personal-os/notes" },
  { name: "Files", href: "/project/personal-os/files" },
  { name: "Settings", href: "/project/personal-os/settings" },
];

export const projects: Project[] = [
  {
    id: "personal-os",
    name: "Personal OS",
    description:
      "A private command center for active work, notes, and planning.",
    status: "active",
    taskCount: 8,
    updatedAt: "Today",
  },
  {
    id: "website-refresh",
    name: "Website Refresh",
    description: "Tighten copy, visual polish, and launch checklist.",
    status: "planning",
    taskCount: 5,
    updatedAt: "Yesterday",
  },
  {
    id: "client-work",
    name: "Client Work",
    description: "Follow-ups, deliverables, and recurring operations.",
    status: "active",
    taskCount: 12,
    updatedAt: "Jul 3",
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    projectId: "personal-os",
    title: "Map core project routes",
    status: "todo",
    priority: "high",
    dueDate: "Jul 5",
  },
  {
    id: "task-2",
    projectId: "personal-os",
    title: "Create task modal sections",
    status: "in-progress",
    priority: "medium",
    dueDate: "Jul 7",
  },
  {
    id: "task-3",
    projectId: "personal-os",
    title: "Draft notes workflow",
    status: "done",
    priority: "low",
    dueDate: "Jul 3",
  },
];

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId) ?? projects[0];
}

export function getProjectTasks(projectId: string) {
  return tasks.filter((task) => task.projectId === projectId);
}
