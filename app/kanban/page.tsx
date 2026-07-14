"use client";

import { useEffect, useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Plus,
  AlertCircle,
  Calendar,
  ChevronRight,
  Sparkles,
  Play,
  Pause,
  Trash2,
  Save,
  X,
} from "lucide-react";

type Priority = "low" | "medium" | "high" | "critical";

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface Comment {
  id: string;
  author: string;
  text: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  projectColor: string;
  priority: Priority;
  dueDate: string;
  status: string;
  checklist: ChecklistItem[];
  comments: Comment[];
  labels: string[];
  stopwatchSeconds: number;
  running: boolean;
}

interface Column {
  id: string;
  title: string;
  dotColor: string;
}

const columns: Column[] = [
  { id: "backlog", title: "Backlog", dotColor: "bg-slate-500" },
  { id: "todo", title: "Todo", dotColor: "bg-yellow-400" },
  { id: "doing", title: "Doing", dotColor: "bg-orange-400" },
  { id: "review", title: "Review", dotColor: "bg-amber-500" },
  { id: "done", title: "Done", dotColor: "bg-emerald-400" },
];

const priorityStyles: Record<Priority, string> = {
  low: "bg-emerald-950 text-emerald-400",
  medium: "bg-amber-950 text-amber-400",
  high: "bg-orange-950 text-orange-400",
  critical: "bg-rose-950 text-rose-400",
};

const seededTasks: Task[] = [
  {
    id: "task-1",
    title: "Tasj1",
    description: "",
    project: "Artikulo",
    projectColor: "bg-amber-500",
    priority: "medium",
    dueDate: "2026-07-15",
    status: "review",
    checklist: [],
    comments: [],
    labels: [],
    stopwatchSeconds: 0,
    running: false,
  },
];

function formatStopwatch(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(seededTasks);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [checklistDraft, setChecklistDraft] = useState("");
  const [commentDraft, setCommentDraft] = useState("");
  const [labelDraft, setLabelDraft] = useState("");

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) ?? null;

  // stopwatch ticking
  useEffect(() => {
    if (!selectedTask?.running) return;
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? { ...t, stopwatchSeconds: t.stopwatchSeconds + 1 }
            : t
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedTask?.running, selectedTask?.id]);

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function tasksByColumn(columnId: string) {
    return tasks.filter((t) => t.status === columnId);
  }

  function handleDragStart(taskId: string) {
    setDraggedId(taskId);
  }

  function handleDragOver(e: React.DragEvent, columnId: string) {
    e.preventDefault();
    setDragOverColumn(columnId);
  }

  function handleDragLeave(columnId: string) {
    setDragOverColumn((current) => (current === columnId ? null : current));
  }

  function handleDrop(columnId: string) {
    if (!draggedId) return;
    updateTask(draggedId, { status: columnId });
    setDraggedId(null);
    setDragOverColumn(null);
  }

  function handleDragEnd() {
    setDraggedId(null);
    setDragOverColumn(null);
  }

  function openTask(taskId: string) {
    setSelectedTaskId(taskId);
    setChecklistDraft("");
    setCommentDraft("");
    setLabelDraft("");
  }

  function closeTask() {
    setSelectedTaskId(null);
  }

  function deleteTask() {
    if (!selectedTask) return;
    setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
    setSelectedTaskId(null);
  }

  function addChecklistItem() {
    if (!selectedTask || !checklistDraft.trim()) return;
    const item: ChecklistItem = {
      id: `chk-${Date.now()}`,
      label: checklistDraft.trim(),
      done: false,
    };
    updateTask(selectedTask.id, { checklist: [...selectedTask.checklist, item] });
    setChecklistDraft("");
  }

  function toggleChecklistItem(itemId: string) {
    if (!selectedTask) return;
    updateTask(selectedTask.id, {
      checklist: selectedTask.checklist.map((c) =>
        c.id === itemId ? { ...c, done: !c.done } : c
      ),
    });
  }

  function postComment() {
    if (!selectedTask || !commentDraft.trim()) return;
    const comment: Comment = {
      id: `cmt-${Date.now()}`,
      author: "You",
      text: commentDraft.trim(),
    };
    updateTask(selectedTask.id, { comments: [...selectedTask.comments, comment] });
    setCommentDraft("");
  }

  function addLabel() {
    if (!selectedTask || !labelDraft.trim()) return;
    updateTask(selectedTask.id, { labels: [...selectedTask.labels, labelDraft.trim()] });
    setLabelDraft("");
  }

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-8 py-12 text-white">
      {/* Header */}
      <div className="flex items-start justify-between pb-6">
        <div>
          <h1 className="font-serif text-4xl italic tracking-tight text-white">
            Kanban Board
          </h1>
          <p className="mt-1 text-sm text-indigo-300/70">
            Drag and drop cards across engineering columns to update priorities and status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-white/10 bg-[#0e0e12] px-3.5 py-2 text-sm font-medium text-white/90 hover:bg-white/5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            All Projects
            <ChevronDown className="h-3.5 w-3.5 text-white/50" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border border-white/10 bg-[#0e0e12] px-3.5 py-2 text-sm font-medium text-white/90 hover:bg-white/5"
          >
            All Priorities
            <ChevronDown className="h-3.5 w-3.5 text-white/50" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Board */}
      <div className="mt-6 grid grid-cols-5 gap-4">
        {columns.map((column) => {
          const columnTasks = tasksByColumn(column.id);
          const isDragOver = dragOverColumn === column.id;

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={() => handleDragLeave(column.id)}
              onDrop={() => handleDrop(column.id)}
              className={`flex min-h-[600px] flex-col rounded-xl border p-3 transition-colors ${
                isDragOver
                  ? "border-indigo-400/50 bg-indigo-500/5"
                  : "border-white/10 bg-transparent"
              }`}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-1 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${column.dotColor}`} />
                  <span className="text-xs font-bold uppercase tracking-wide text-white/90">
                    {column.title}
                  </span>
                </div>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px] font-medium text-white/60">
                  {columnTasks.length}
                </span>
              </div>

              {/* Add task */}
              <button
                type="button"
                className="mb-3 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#0e0e12] py-2 text-sm text-indigo-300/80 hover:bg-white/5"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                Add Task
              </button>

              {/* Cards / empty state */}
              {columnTasks.length === 0 ? (
                <div className="flex flex-1 items-start justify-center rounded-lg border border-dashed border-white/10 bg-[#0e0e12]/60 py-10">
                  <div className="flex flex-col items-center gap-2 text-white/30">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-xs">Empty column</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => openTask(task.id)}
                      className={`cursor-grab rounded-lg border border-white/10 bg-[#111116] p-3.5 transition-opacity hover:border-white/20 active:cursor-grabbing ${
                        draggedId === task.id ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white/30" />
                      </div>

                      <h3 className="mt-2.5 text-sm font-semibold text-white">
                        {task.title}
                      </h3>

                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-indigo-300/80">
                        <span className={`h-1.5 w-1.5 rounded-full ${task.projectColor}`} />
                        {task.project}
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
                        <Calendar className="h-3.5 w-3.5" />
                        {task.dueDate.slice(5).replace("-", "-")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeTask}
        >
          <div
            className="grid max-h-[90vh] w-[900px] max-w-[95vw] grid-cols-[1fr_280px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0d] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left column */}
            <div className="border-r border-white/10 p-6">
              <div className="flex items-center justify-between">
                <input
                  value={selectedTask.title}
                  onChange={(e) => updateTask(selectedTask.id, { title: e.target.value })}
                  className="w-full bg-transparent text-xl font-semibold text-white outline-none"
                />
                <button
                  type="button"
                  onClick={closeTask}
                  className="ml-3 rounded-md p-1 text-white/40 hover:bg-white/10 hover:text-white/80 lg:hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 border-b border-white/10" />

              {/* Description */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Task Description
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 hover:bg-amber-500/20"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Expand description with AI
                  </button>
                </div>
                <textarea
                  value={selectedTask.description}
                  onChange={(e) => updateTask(selectedTask.id, { description: e.target.value })}
                  placeholder="Add comprehensive specifications, markdown details, or technology stack plans..."
                  className="mt-2.5 h-28 w-full resize-y rounded-lg border border-white/10 bg-[#111116] p-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                />
              </div>

              {/* Sub-tasks checklist */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Sub-tasks Checklist
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 hover:bg-amber-500/20"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Suggest with AI
                  </button>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <input
                    value={checklistDraft}
                    onChange={(e) => setChecklistDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                    placeholder="Add checklist task..."
                    className="flex-1 rounded-lg border border-white/10 bg-[#111116] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={addChecklistItem}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#0a0a0d] hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
                {selectedTask.checklist.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {selectedTask.checklist.map((item) => (
                      <li key={item.id} className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleChecklistItem(item.id)}
                          className="h-4 w-4 rounded border-white/20 bg-[#111116] accent-amber-500"
                        />
                        <span
                          className={`text-sm ${
                            item.done ? "text-white/30 line-through" : "text-white/80"
                          }`}
                        >
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Comments */}
              <div className="mt-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Comments Thread
                </span>
                {selectedTask.comments.length > 0 && (
                  <ul className="mt-2.5 flex flex-col gap-2.5">
                    {selectedTask.comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="rounded-lg border border-white/10 bg-[#111116] px-3 py-2 text-sm text-white/80"
                      >
                        <span className="mr-1.5 font-semibold text-white">
                          {comment.author}:
                        </span>
                        {comment.text}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2.5 flex gap-2">
                  <input
                    value={commentDraft}
                    onChange={(e) => setCommentDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && postComment()}
                    placeholder="Write comment..."
                    className="flex-1 rounded-lg border border-white/10 bg-[#111116] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={postComment}
                    className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6 p-6">
              {/* Stopwatch */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Work Stopwatch
                </span>
                <div className="mt-2.5 flex items-center justify-between rounded-lg border border-white/10 bg-[#111116] px-4 py-3">
                  <span className="font-mono text-2xl font-bold tabular-nums text-amber-400">
                    {formatStopwatch(selectedTask.stopwatchSeconds).h}
                    <span className="text-white/30">:</span>
                    {formatStopwatch(selectedTask.stopwatchSeconds).m}
                    <span className="text-white/30">:</span>
                    {formatStopwatch(selectedTask.stopwatchSeconds).s}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateTask(selectedTask.id, { running: !selectedTask.running })}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0a0a0d] hover:opacity-90"
                  >
                    {selectedTask.running ? (
                      <Pause className="h-4 w-4" fill="currentColor" />
                    ) : (
                      <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />
                    )}
                  </button>
                </div>
              </div>

              {/* Project workspace */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Project Workspace
                </span>
                <div className="relative mt-2.5">
                  <select
                    value={selectedTask.project}
                    onChange={(e) => updateTask(selectedTask.id, { project: e.target.value })}
                    className="w-full appearance-none rounded-lg border border-white/10 bg-[#111116] px-3 py-2.5 text-sm font-medium text-white outline-none focus:border-white/20"
                  >
                    <option>Artikulo</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                </div>
              </div>

              {/* Priority */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Task Priority
                </span>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {(["low", "medium", "high", "critical"] as Priority[]).map((p) => {
                    const active = selectedTask.priority === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => updateTask(selectedTask.id, { priority: p })}
                        className={`rounded-lg border py-2 text-xs font-bold uppercase tracking-wide ${
                          active
                            ? "border-amber-400 bg-amber-400/10 text-amber-400"
                            : "border-white/10 bg-[#111116] text-white/60 hover:bg-white/5"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Due date */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Due Date
                </span>
                <div className="relative mt-2.5">
                  <input
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => updateTask(selectedTask.id, { dueDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#111116] px-3 py-2.5 text-sm font-medium text-white outline-none [color-scheme:dark] focus:border-white/20"
                  />
                </div>
              </div>

              {/* Labels */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Labels &amp; Tags
                </span>
                <div className="mt-2.5 flex gap-2">
                  <input
                    value={labelDraft}
                    onChange={(e) => setLabelDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addLabel()}
                    placeholder="New label..."
                    className="flex-1 rounded-lg border border-white/10 bg-[#111116] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={addLabel}
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-white text-[#0a0a0d] hover:opacity-90"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
                {selectedTask.labels.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {selectedTask.labels.map((label, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/10 bg-[#111116] px-2.5 py-1 text-xs text-white/70"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={deleteTask}
                  className="flex items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Task
                </button>
                <button
                  type="button"
                  onClick={closeTask}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-medium text-[#0a0a0d] hover:opacity-90"
                >
                  <Save className="h-4 w-4" />
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}