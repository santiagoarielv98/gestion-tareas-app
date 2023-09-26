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
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

import { DragDropContext, Droppable, Draggable, type OnDragEndResponder } from 'react-beautiful-dnd'
import IconButton from '@mui/material/IconButton'

// const getRandomColor = (): string => {
//   const letters = '0123456789ABCDEF'
//   let color = '#'
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

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

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, type } = result
    if (destination === null || destination === undefined) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (type === 'column') {
      const newColumns = [...columns]
      const column = newColumns.splice(source.index, 1)[0]
      newColumns.splice(destination.index, 0, column)
      setColumns(newColumns)
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
          overflow: 'auto',
          flexGrow: 1
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: 'flex',
                  height: '100%'
                }}
              >
                <InnerColumnList columns={columns} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  )
}

const InnerColumnList = React.memo((props: { columns: Column[] }): JSX.Element[] => {
  const { columns } = props
  return columns.map((column, index) => <ColumnComponent key={column._id} column={column} index={index} />)
})

InnerColumnList.displayName = 'InnerColumnList'

const InnerTaskList = React.memo<{ tasks: Task[] }>(
  (props): JSX.Element[] => {
    const { tasks } = props
    return tasks.map((task, index) => <TaskComponent key={task._id} task={task} index={index} />)
  },
  (prevProps, nextProps) => prevProps.tasks !== nextProps.tasks
)

InnerTaskList.displayName = 'InnerTaskList'

interface ColumnComponentProps {
  column: Column
  index: number
}

const ColumnComponent = ({ column, index }: ColumnComponentProps): JSX.Element => {
  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            mr: 2,
            bgcolor: 'common.white'
          }}
        >
          <ListItem
            secondaryAction={
              <IconButton edge="end" {...provided.dragHandleProps} size="small" sx={{ ml: 1 }}>
                <DragIndicatorIcon />
              </IconButton>
            }
          >
            <CircleIcon
              sx={{
                mr: 2
              }}
              fontSize="inherit"
            />
            <ListItemText primary={`${column.title} (${column.tasks.length})`} />
          </ListItem>
          <Droppable droppableId={column._id} type="task">
            {(provided, snapshot) => (
              <List
                ref={provided.innerRef}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  transition: 'background-color 0.2s ease',
                  bgcolor: snapshot.isDraggingOver ? 'grey.300' : 'grey.100',
                  p: 2
                }}
                {...provided.droppableProps}
              >
                <InnerTaskList tasks={column.tasks} />
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
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
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          disablePadding
          sx={{ marginBottom: 2 }}
        >
          <Card
            sx={{
              width: '100%',
              backgroundColor: snapshot.isDragging ? 'cyan' : 'white'
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
