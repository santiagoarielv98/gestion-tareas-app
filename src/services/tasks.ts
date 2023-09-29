import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks'
    })
  })
});

export const { useGetTasksQuery } = tasksApi;
