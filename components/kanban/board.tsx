import type { Task } from "@/types/task";

import { Column } from "./column";
import { columnProgress } from "@/lib/constants/board";

export function Board({ tasks }: { tasks: Task[] }) {
  return (
    <div className="kanban-board">
      {columnProgress.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.id)}
        />
      ))}
    </div>
  );
}
