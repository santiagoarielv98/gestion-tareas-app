import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Draggable } from 'react-beautiful-dnd';

import type { Task } from '../../types/kanban';

interface TaskProps {
  task: Task;
  index: number;
}

const TaskItem = ({ task, index }: TaskProps): JSX.Element => {
  const length = task.subtasks.length;
  const completed = task.subtasks.filter((subtask) => subtask.done).length;

  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          disablePadding
          sx={{ marginBottom: 2 }}
        >
          <Card
            sx={{
              width: '100%',
              backgroundColor: snapshot.isDragging ? 'cyan' : 'white'
            }}
          >
            <CardContent>
              <ListItemText primary={task.title} secondary={`${completed} of ${length} tasks completed`} />
            </CardContent>
          </Card>
        </ListItem>
      )}
    </Draggable>
  );
};

export default TaskItem;
