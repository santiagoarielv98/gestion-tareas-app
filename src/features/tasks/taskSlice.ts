import { createSlice } from '@reduxjs/toolkit'

export interface TasksState {
  list: any[]
}

const initialState: TasksState = {
  list: []
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {}
})

export default taskSlice.reducer
