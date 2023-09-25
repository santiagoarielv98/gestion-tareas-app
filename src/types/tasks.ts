export interface Task {
  _id: string
  name: string
  description: string
  completed: boolean
}

export interface TaskCreate {
  name: string
  description?: string
  completed?: boolean
}

export interface TaskUpdate {
  _id: string
  name?: string
  description?: string
  completed?: boolean
}

export interface SubTask {
  title: string
  done: boolean
}
