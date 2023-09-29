import React from 'react';

import { useGetColumnsQuery, useMoveMutation } from '../../services/api';

import Button from '@mui/material/Button';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import InnerColumnList from '../../components/kanban/InnerColumnList';

import type { OnDragEndResponder } from 'react-beautiful-dnd';
import type { DeepNonNullable } from '../../types/common';

const Home = (): JSX.Element => {
  const { data: columns = [] } = useGetColumnsQuery();
  const [move, { isLoading }] = useMoveMutation();

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;
    if (isLoading || !destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    move(result as DeepNonNullable<DropResult>);
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

export default Home;
