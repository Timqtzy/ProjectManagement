export type TaskStore = {
  selectedTaskId?: string
  search: string
}

export const taskStore: TaskStore = {
  search: "",
}
