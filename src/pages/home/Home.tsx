import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useGetTasksQuery, useUpdateTaskMutation } from '../../services/tasks'
import type { Task } from '../../types/tasks'

const Home = (): JSX.Element => {
  const { data = [], isFetching } = useGetTasksQuery()
  const [updateTask, result] = useUpdateTaskMutation({
    fixedCacheKey: 'shared-update-post'
  })

  const handleUpdate = async (task: Task): Promise<void> => {
    await updateTask({
      ...task,
      completed: !task.completed
    })
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map((task) => {
        return (
          <ListItem
            key={task._id}
            secondaryAction={
              <Checkbox
                edge="end"
                onClick={() => {
                  void handleUpdate(task)
                }}
                disabled={result.isLoading || isFetching}
                checked={task.completed}
              />
            }
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={task._id} primary={task.name} secondary={task.description} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Home
