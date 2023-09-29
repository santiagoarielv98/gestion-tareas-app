import React from 'react';
import type { SubTask } from '../../types/kanban';

interface UseAddTask {
  subtask: SubTask[];
  addSubtask: () => void;
  removeSubtask: (index: number) => void;
  updateSubtask: (index: number, value: Partial<SubTask>) => void;
  createTask: (ev: React.FormEvent<HTMLFormElement>) => void;
}

const useAddTask = (): UseAddTask => {
  const [subtask, setSubtask] = React.useState<SubTask[]>([
    {
      _id: Math.random().toString(36).substring(7),
      done: false,
      title: ''
    }
  ]);

  const addSubtask = (): void => {
    setSubtask([
      ...subtask,
      {
        _id: Math.random().toString(36).substring(7),
        title: '',
        done: false
      }
    ]);
  };

  const removeSubtask = (index: number): void => {
    setSubtask(subtask.filter((_, i) => i !== index));
  };

  const updateSubtask = (index: number, value: Partial<SubTask>): void => {
    const newSubtask = [...subtask];
    newSubtask[index] = { ...newSubtask[index], ...value };
    setSubtask(newSubtask);
  };

  const createTask = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const { title = '', description = '', status = 'todo', done } = Object.fromEntries(formData.entries());

    const filterSubtasks = subtask.filter((item) => item.title !== '');

    console.log({
      done: done === 'on',
      title,
      description,
      status,
      subtask: filterSubtasks
    });
  };

  return {
    subtask,
    addSubtask,
    removeSubtask,
    updateSubtask,
    createTask
  };
};

export default useAddTask;
