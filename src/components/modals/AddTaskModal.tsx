import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Dialog, { type DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import TextField from '@mui/material/TextField'
import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

interface SubTask {
  title: string
  done: boolean
}

const AddTaskModal = ({ open, onClose }: DialogProps): JSX.Element => {
  const [subtask, setSubtask] = React.useState<SubTask[]>([
    {
      done: false,
      title: ''
    }
  ])
  const [checked, setChecked] = React.useState(false)

  const handleAddFruit = (): void => {
    setSubtask([...subtask, { title: '', done: false }])
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 480
        }
      }}
    >
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        {/* status */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel component="legend" focused={false}>
            Status
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                id="status"
                name="status"
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked)
                }}
              />
            }
            label={checked ? 'Done' : 'Not Done'}
          />
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          placeholder="e.g. Buy milk"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          placeholder="e.g. visit the nearest supermarket and buy milk. Don't forget to check the expiration date!"
          InputLabelProps={{ shrink: true }}
          multiline
          rows={4}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel component="legend" focused={false}>
            Subtask
          </FormLabel>
          <List>
            <TransitionGroup>
              {subtask.map((item, index) => (
                <Collapse key={`${item.title}-${index}`}>
                  {
                    <TextField
                      margin="dense"
                      type="text"
                      fullWidth
                      placeholder="e.g. Buy milk"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <>
                            <Checkbox id={`subtask-${index}`} />
                            <IconButton
                              onClick={() => {
                                setSubtask(subtask.filter((_, i) => i !== index))
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )
                      }}
                    />
                  }
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
          <Button variant="contained" onClick={handleAddFruit}>
            Add New Subtask
          </Button>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={(ev) => {
            onClose?.(ev, 'backdropClick')
          }}
          variant="contained"
          fullWidth
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTaskModal
