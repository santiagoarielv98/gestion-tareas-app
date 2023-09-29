export interface Column {
  _id: string;
  title: string;
  description?: string;
  tasks: Task[];
  position: number;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  subtasks: SubTask[];
  position: number;
}

export interface SubTask {
  _id: string;
  title: string;
  done: boolean;
}
