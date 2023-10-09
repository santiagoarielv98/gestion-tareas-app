import React from 'react';

import Button from '@mui/material/Button';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InnerColumnList from '../../components/kanban/InnerColumnList';

import type { OnDragEndResponder } from 'react-beautiful-dnd';
import { Column } from '../../types/kanban';
import { KanbanType } from '../../constants/app';

const Home = (): JSX.Element => {
  const [columns, setColumns] = React.useState<Column[]>([]);

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const newColumns = [...columns];
      const column = newColumns.splice(source.index, 1)[0];
      newColumns.splice(destination.index, 0, column);
      setColumns(newColumns);
      return;
    }

    const newColumns = [...columns];
    const sourceColumnIndex = newColumns.findIndex((column) => column._id === source.droppableId);
    const destinationColumnIndex = newColumns.findIndex((column) => column._id === destination.droppableId);

    const sourceColumn = newColumns[sourceColumnIndex];
    const destinationColumn = newColumns[destinationColumnIndex];

    const task = sourceColumn.tasks.splice(source.index, 1)[0];
    destinationColumn.tasks.splice(destination.index, 0, task);

    setColumns(newColumns);
  };

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
          <Droppable droppableId="columns" direction="horizontal" type={KanbanType.COLUMN}>
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

export default Home;
