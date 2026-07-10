import {
  LayoutDashboard,
  InboxIcon,
  Calendar,
  Settings,
    ListIcon,
    KanbanSquareIcon,
    FolderIcon,
    NotebookTabs,
} from "lucide-react";

export const sidebarNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {name: "Project", href: "/project", icon: FolderIcon },
  {name: "Kanban Board", href: "/kanban", icon: KanbanSquareIcon },
  { name: "List View", href: "/list-view", icon: ListIcon },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Inbox", href: "/inbox", icon: InboxIcon },
  {name: "Notes", href: "/notes", icon: NotebookTabs},
  { name: "Settings", href: "/settings", icon: Settings },
];
