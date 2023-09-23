import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants/app'
import type { Task, TaskCreate, TaskUpdate } from '../types/tasks'

enum TagTypes {
  Task = 'Task'
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [TagTypes.Task],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'tasks',
      providesTags: (result) =>
        // is result available?
        result !== undefined
          ? [...result.map(({ _id }) => ({ type: TagTypes.Task, _id } as const)), { type: TagTypes.Task, id: 'LIST' }]
          : [{ type: TagTypes.Task, id: 'LIST' }]
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `tasks/${id}`
    }),
    createTask: builder.mutation<Task, TaskCreate>({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: TagTypes.Task }]
    }),
    updateTask: builder.mutation<Task, TaskUpdate>({
      query: ({ _id, ...body }) => ({
        url: `tasks/${_id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: TagTypes.Task }]
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: TagTypes.Task }]
    })
  })
})

export const { useGetTasksQuery, useUpdateTaskMutation, useCreateTaskMutation, useDeleteTaskMutation } = tasksApi
