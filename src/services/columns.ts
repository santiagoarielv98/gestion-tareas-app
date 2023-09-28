import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks'
    })
  })
})
