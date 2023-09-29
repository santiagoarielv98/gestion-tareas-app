import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DropResult } from 'react-beautiful-dnd';
import { Column } from '../types/kanban';
import type { DeepNonNullable } from '../types/common';
import { API_URL } from '../constants/app';

const updatePosition = <T extends { position: number }>(item: T, index: number) => {
  item.position = index;
};

export const api = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Columns'],
  endpoints: (builder) => ({
    getColumns: builder.query<Column[], void>({
      query: () => '/columns',
      providesTags: ['Columns']
    }),
    move: builder.mutation<void, DeepNonNullable<DropResult>>({
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

                draftColumns.forEach(updatePosition);
                break;
              }
              case 'tasks':
                {
                  const sourceColumn = draftColumns.find((column) => column._id === source.droppableId);
                  const destinationColumn = draftColumns.find((column) => column._id === destination.droppableId);

                  if (!sourceColumn || !destinationColumn) break;

                  const [taskToMove] = sourceColumn.tasks.splice(source.index, 1);
                  destinationColumn.tasks.splice(destination.index, 0, taskToMove);

                  sourceColumn.tasks.forEach(updatePosition);
                  destinationColumn.tasks.forEach(updatePosition);
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

export const { useGetColumnsQuery, useMoveMutation } = api;
