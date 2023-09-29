import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DropResult } from 'react-beautiful-dnd';
import { Column } from '../types/tasks';
import type { DeepNonNullable } from '../types/common';

export const api = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Columns'],
  endpoints: (builder) => ({
    getColumns: builder.query<Column[], void>({
      query: () => '/columns',
      providesTags: ['Columns']
    }),
    updatePosition: builder.mutation<void, DeepNonNullable<DropResult>>({
      query: (dropResult) => ({
        url: `/${dropResult.type}/${dropResult.draggableId}/position`,
        method: 'PUT',
        body: dropResult
      }),
      async onQueryStarted({ source, destination, type }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getColumns', undefined, (draftColumns) => {
            switch (type) {
              case 'columns': {
                const [removed] = draftColumns.splice(source.index, 1);
                draftColumns.splice(destination!.index, 0, removed);

                draftColumns.forEach((column, index) => {
                  column.position = index;
                });
                break;
              }
              case 'tasks':
                {
                  const sourceColumn = draftColumns.find((column) => column._id === source.droppableId);
                  const destinationColumn = draftColumns.find((column) => column._id === destination.droppableId);

                  if (!sourceColumn || !destinationColumn) break;

                  const [taskToMove] = sourceColumn.tasks.splice(source.index, 1);
                  destinationColumn.tasks.splice(destination.index, 0, taskToMove);

                  sourceColumn.tasks.forEach((task, index) => {
                    task.position = index;
                  });
                  destinationColumn.tasks.forEach((task, index) => {
                    task.position = index;
                  });
                }
                break;
              default:
                break;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Columns']
    })
  })
});

export const { useGetColumnsQuery, useUpdatePositionMutation } = api;
