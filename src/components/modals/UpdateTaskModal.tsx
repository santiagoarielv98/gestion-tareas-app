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
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useUpdateTaskMutation } from '../../services/tasks'
import type { Task } from '../../types/tasks'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

interface CustomizedDialogsProps {
  open: boolean
  onClose: () => void
  task: Task
}

const UpdateTaskModal = ({ open, onClose, task }: CustomizedDialogsProps): JSX.Element => {
  const [updateTask] = useUpdateTaskMutation()

  const handleClose = (): void => {
    onClose()
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLDivElement>): Promise<void> => {
    ev.preventDefault()

    const form = ev.target as HTMLFormElement
    const formData = new FormData(form)

    const updatedTask = {
      _id: task._id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      completed: (formData.get('completed') as string) === 'on'
    }
    try {
      await updateTask(updatedTask)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BootstrapDialog
      component="form"
      onClose={handleClose}
      onSubmit={(ev) => {
        void handleSubmit(ev)
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update Task &quot;{task.name}&quot;
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
          defaultValue={task.name}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          name="description"
          label="Task Description"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={task.description}
        />
        <FormGroup>
          <FormControl margin="dense" component="fieldset" variant="standard">
            <FormLabel focused={false} component="legend">
              Task Status
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox id="completed" name="completed" defaultChecked={task.completed} />}
                label="Completed"
              />
            </FormGroup>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type="submit">
          Update Task
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default UpdateTaskModal
