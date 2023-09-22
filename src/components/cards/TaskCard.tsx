import type { Task } from '../../types/tasks'

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  return <div>TaskCard</div>
}

export default TaskCard
