export interface Column {
  _id: string
  title: string
  description?: string
  tasks: Task[]
}

export interface Task {
  _id: string
  title: string
  description?: string
  done: boolean
  subtasks: SubTask[]
}

export interface SubTask {
  _id: string
  title: string
  done: boolean
}
