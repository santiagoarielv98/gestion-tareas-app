import CircleIcon from '@mui/icons-material/Circle'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import Button from '@mui/material/Button'
import React from 'react'
import kanban from '../../mocks/kanban.json'
import type { Column, Task } from '../../types/tasks'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const Home = (): JSX.Element => {
  const [columns, setColumns] = React.useState<Column[]>([])

  React.useEffect(() => {
    setColumns(kanban)
  }, [])

  const createColumn = (): void => {
    const newColumn: Column = {
      _id: Math.random().toString(36).substring(7),
      title: 'New Column',
      tasks: []
    }
    setColumns([newColumn, ...columns])
  }

  const createTask = (): void => {
    const newTask: Task = {
      _id: Math.random().toString(36).substring(7),
      title: 'New Task',
      subtasks: [],
      done: false
    }
    // random column
    const randomColumn = Math.floor(Math.random() * columns.length)
    const newColumns = [...columns]
    newColumns[randomColumn].tasks.push(newTask)
    setColumns(newColumns)
  }

  return (
    <>
      <div
        style={{
          zIndex: 1000,
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          gap: 15
        }}
      >
        <Button variant="contained" onClick={createColumn}>
          Create Column
        </Button>
        <Button variant="contained" onClick={createTask}>
          Create Task
        </Button>
      </div>

      <div
        style={{
          overflow: 'auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 15
          }}
        >
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination } = result
              if (destination === null || destination === undefined) {
                return
              }

              if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return
              }

              const newColumns = [...columns]
              const sourceColumnIndex = newColumns.findIndex((column) => column._id === source.droppableId)
              const destinationColumnIndex = newColumns.findIndex((column) => column._id === destination.droppableId)

              const sourceColumn = newColumns[sourceColumnIndex]
              const destinationColumn = newColumns[destinationColumnIndex]

              const task = sourceColumn.tasks.splice(source.index, 1)[0]
              destinationColumn.tasks.splice(destination.index, 0, task)

              setColumns(newColumns)
            }}
          >
            {columns.map((column) => (
              <Box
                sx={{
                  minWidth: 320
                }}
                key={column._id}
              >
                <ListItem component="div">
                  <CircleIcon
                    sx={{
                      mr: 2,
                      color: getRandomColor()
                    }}
                    fontSize="inherit"
                  />
                  <ListItemText primary={`${column.title} (${column.tasks.length})`} />
                </ListItem>
                <Droppable droppableId={column._id}>
                  {(provided) => (
                    <List
                      ref={provided.innerRef}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                      }}
                      {...provided.droppableProps}
                    >
                      {column.tasks.map((task, index) => (
                        <TaskComponent key={task._id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Box>
            ))}
          </DragDropContext>
        </div>
      </div>
    </>
  )
}

interface TaskComponentProps {
  task: Task
  index: number
}

const TaskComponent = ({ task, index }: TaskComponentProps): JSX.Element => {
  const length = task.subtasks.length
  const completed = task.subtasks.filter((subtask) => subtask.done).length
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} disablePadding>
          <Card
            sx={{
              width: '100%',
              backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white'
            }}
          >
            <CardContent>
              <ListItemText primary={task.title} secondary={`${completed} of ${length} tasks completed`} />
            </CardContent>
          </Card>
        </ListItem>
      )}
    </Draggable>
  )
}

export default Home
