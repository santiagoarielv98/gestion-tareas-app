import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Column } from '../types/tasks';
import { DropResult } from 'react-beautiful-dnd';

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Columns'],
  endpoints: (builder) => ({
    getColumns: builder.query<Column[], void>({
      query: () => '/columns',
      providesTags: ['Columns']
    }),
    updatePosition: builder.mutation<void, DropResult>({
      query: (dropResult) => ({
        url: `/columns/${dropResult.draggableId}/position`,
        method: 'PUT',
        body: dropResult
      }),
      async onQueryStarted(result, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          columnsApi.util.updateQueryData('getColumns', undefined, (draftColumns) => {
            const [removed] = draftColumns.splice(result.source.index, 1);
            draftColumns.splice(result.destination!.index, 0, removed);

            draftColumns.forEach((column, index) => {
              column.position = index;
            });
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

export const { useGetColumnsQuery, useUpdatePositionMutation } = columnsApi;
