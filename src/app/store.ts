import { configureStore } from '@reduxjs/toolkit'
// Reducers
import taskReducer from '../features/tasks/taskSlice'
import { tasksApi } from '../services/tasks'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
