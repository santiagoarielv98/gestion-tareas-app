import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants/app'
import type { Task } from '../types/tasks'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'tasks'
    })
  })
})

export const { useGetTasksQuery } = tasksApi
