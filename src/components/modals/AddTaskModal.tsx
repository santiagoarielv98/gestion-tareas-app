import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { TransitionGroup } from 'react-transition-group';
import useAddTask from './useAddTask';
import FormControlLabel from '@mui/material/FormControlLabel';

const AddTaskModal = ({ open, onClose }: DialogProps): JSX.Element => {
  const { subtask, addSubtask, createTask, removeSubtask, updateSubtask } = useAddTask();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: createTask,
        sx: {
          width: '100%',
          maxWidth: 480
        }
      }}
    >
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          placeholder="e.g. Buy milk"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          placeholder="e.g. visit the nearest supermarket and buy milk. Don't forget to check the expiration date!"
          InputLabelProps={{ shrink: true }}
          multiline
          rows={4}
        />

        <FormControl fullWidth>
          <FormLabel component="legend" focused={false}>
            Subtask
          </FormLabel>
          <List>
            <TransitionGroup>
              {subtask.map((item, index) => (
                <Collapse key={index}>
                  {
                    <TextField
                      value={item.title}
                      onChange={(ev) => {
                        updateSubtask(index, { title: ev.target.value });
                      }}
                      name={`subtask-${index}`}
                      margin="dense"
                      type="text"
                      fullWidth
                      placeholder="e.g. Buy milk"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <>
                            <Checkbox
                              checked={item.done}
                              onChange={(ev) => {
                                updateSubtask(index, { done: ev.target.checked });
                              }}
                              id={`subtask-${index}`}
                              name={`subtask-${index}-done`}
                            />
                            <IconButton
                              onClick={() => {
                                removeSubtask(index);
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
          <Button variant="outlined" onClick={addSubtask}>
            Add New Subtask
          </Button>
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            name="status"
            margin="dense"
            label="Status"
            labelId="status-label"
            id="status"
            variant="outlined"
            defaultValue="todo"
            fullWidth
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel component="legend">Is this task done?</FormLabel>
          <FormControlLabel control={<Checkbox name="done" />} label="Done" />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button type="submit" variant="contained" fullWidth>
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
