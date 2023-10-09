import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import InnerTaskList from './InnerTaskList';

import CircleIcon from '@mui/icons-material/Circle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import type { Column } from '../../types/kanban';
import { KanbanType } from '../../constants/app';

interface ColumnProps {
  column: Column;
  index: number;
}

const ColumnItem = ({ column, index }: ColumnProps): JSX.Element => {
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
          <Droppable droppableId={column._id} type={KanbanType.TASK}>
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

export default ColumnItem;
