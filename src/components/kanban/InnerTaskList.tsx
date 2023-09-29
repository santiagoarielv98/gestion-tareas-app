import React from 'react';

import TaskItem from './Task';

import type { Task } from '../../types/tasks';

export interface InnerTaskListProps {
  tasks: Task[];
}

const InnerTaskList = ({ tasks = [] }: InnerTaskListProps): JSX.Element[] => {
  return tasks.map((task, index) => <TaskItem key={task._id} task={task} index={index} />);
};

export default InnerTaskList;
