import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'
import * as React from 'react'
import { useDeleteTaskMutation } from '../../services/tasks'

const Animation = (
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
): JSX.Element => {
  return <Slide direction="up" ref={ref} {...props} />
}

const Transition = React.forwardRef(Animation)

interface DeleteTaskModalProps {
  id: string
}

const DeleteTaskModal = ({ id }: DeleteTaskModalProps): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [deleteTask, { isLoading }] = useDeleteTaskMutation({})

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleDelete = async (): Promise<void> => {
    await deleteTask(id)
    handleClose()
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              void handleDelete()
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteTaskModal
