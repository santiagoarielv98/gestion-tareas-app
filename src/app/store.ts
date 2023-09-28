import { configureStore } from '@reduxjs/toolkit'
// Reducers
import { tasksApi } from '../services/tasks'
import { columnsApi } from '../services/columns'

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware).concat(columnsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
