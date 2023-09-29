import React from 'react';

import TaskItem from './Task';

import type { Task } from '../../types/kanban';

export interface InnerTaskListProps {
  tasks: Task[];
}

const InnerTaskList = ({ tasks = [] }: InnerTaskListProps) => {
  return (
    <>
      {tasks.map((task, index) => (
        <TaskItem key={task._id} task={task} index={index} />
      ))}
    </>
  );
};

export default InnerTaskList;
