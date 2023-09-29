import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Button from '@mui/material/Button';
import type { Column, Task } from '../../types/tasks';

import IconButton from '@mui/material/IconButton';
import { DragDropContext, Draggable, DropResult, Droppable, type OnDragEndResponder } from 'react-beautiful-dnd';
import { useGetColumnsQuery, useUpdatePositionMutation } from '../../services/api';
import { DeepNonNullable } from '../../types/common';

const Home = (): JSX.Element => {
  const { data: columns = [], isFetching } = useGetColumnsQuery();
  const [updatePosition, { isLoading }] = useUpdatePositionMutation();

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;
    if (isLoading || !destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    updatePosition(result as DeepNonNullable<DropResult>);
  };

  React.useEffect(() => {
    console.log(columns, isFetching);
  }, [columns]);

  return (
    <>
      <div
        style={{
          zIndex: 1000,
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          gap: 15
        }}
      >
        <Button variant="contained">Create Column</Button>
        <Button variant="contained">Create Task</Button>
      </div>

      <div
        style={{
          overflow: 'auto',
          flexGrow: 1
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns" direction="horizontal" type="columns">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: 'flex',
                  height: '100%'
                }}
              >
                <InnerColumnList columns={columns} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

const InnerColumnList = (props: { columns: Column[] }): JSX.Element[] => {
  const { columns = [] } = props;

  return columns.map((column, index) => <ColumnComponent key={column._id} column={column} index={index} />);
};

const InnerTaskList = (props: { tasks: Task[] }): JSX.Element[] => {
  const { tasks } = props;
  return tasks.map((task, index) => <TaskComponent key={task._id} task={task} index={index} />);
};

interface ColumnComponentProps {
  column: Column;
  index: number;
}

const ColumnComponent = ({ column, index }: ColumnComponentProps): JSX.Element => {
  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            mr: 2,
            bgcolor: 'common.white'
          }}
        >
          <ListItem
            secondaryAction={
              <IconButton edge="end" {...provided.dragHandleProps} size="small" sx={{ ml: 1 }}>
                <DragIndicatorIcon />
              </IconButton>
            }
          >
            <CircleIcon
              sx={{
                mr: 2
              }}
              fontSize="inherit"
            />
            <ListItemText primary={`${column.title} (${column.tasks.length})`} />
          </ListItem>
          <Droppable droppableId={column._id} type="tasks">
            {(provided, snapshot) => (
              <List
                ref={provided.innerRef}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  transition: 'background-color 0.2s ease',
                  bgcolor: snapshot.isDraggingOver ? 'grey.300' : 'grey.100',
                  p: 2
                }}
                {...provided.droppableProps}
              >
                <InnerTaskList tasks={column.tasks} />
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
};

interface TaskComponentProps {
  task: Task;
  index: number;
}

const TaskComponent = ({ task, index }: TaskComponentProps): JSX.Element => {
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

export default Home;
