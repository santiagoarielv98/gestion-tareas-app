import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { useCreateTaskMutation } from '../../services/tasks'

const AddTaskModal = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [createTask] = useCreateTaskMutation()

  const handleClickOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLDivElement>): Promise<void> => {
    ev.preventDefault()

    const form = ev.target as HTMLFormElement
    const formData = new FormData(form)

    const task = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      completed: (formData.get('completed') as string) === 'on'
    }
    try {
      await createTask(task)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color="inherit">
        + Add Task
      </Button>
      <Dialog
        component="form"
        onClose={handleClose}
        onSubmit={(ev) => {
          void handleSubmit(ev)
        }}
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create a new task
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Task Name"
            type="text"
            variant="standard"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Task Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormGroup>
            <FormControl margin="dense" component="fieldset" variant="standard">
              <FormLabel focused={false} component="legend">
                Task Status
              </FormLabel>
              <FormGroup>
                <FormControlLabel control={<Checkbox id="completed" name="completed" />} label="Completed" />
              </FormGroup>
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Create Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTaskModal
