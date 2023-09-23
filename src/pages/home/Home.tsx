import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useGetTasksQuery, useUpdateTaskMutation } from '../../services/tasks'
import type { Task } from '../../types/tasks'
import DeleteTaskModal from '../../components/modals/DeleteTaskModal'
import React from 'react'
import UpdateTaskModal from '../../components/modals/UpdateTaskModal'

const Home = (): JSX.Element => {
  const { data = [], isFetching } = useGetTasksQuery()
  const [open, setOpen] = React.useState(false)
  const [task, setTask] = React.useState<Task | null>(null)
  const [updateTask, result] = useUpdateTaskMutation()

  const handleUpdate = async (task: Task): Promise<void> => {
    await updateTask({
      ...task,
      completed: !task.completed
    })
  }

  const handleOpen = (task: Task): void => {
    setOpen(true)
    setTask(task)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map((task) => {
        return (
          <ListItem
            key={task._id}
            secondaryAction={
              <>
                <Checkbox
                  onClick={() => {
                    void handleUpdate(task)
                  }}
                  disabled={result.isLoading || isFetching}
                  checked={task.completed}
                />
                <DeleteTaskModal id={task._id} />
              </>
            }
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                handleOpen(task)
              }}
            >
              <ListItemText id={task._id} primary={task.name} secondary={task.description} />
            </ListItemButton>
          </ListItem>
        )
      })}
      {task !== null && <UpdateTaskModal open={open} onClose={handleClose} task={task} />}
    </List>
  )
}

export default Home
