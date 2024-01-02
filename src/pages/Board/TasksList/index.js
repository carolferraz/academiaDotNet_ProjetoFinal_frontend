import { Box, Paper, TextField, Typography, Button, Dialog, DialogActions, DialogTitle, DialogContent  } from "@mui/material";
import TaskItem from "../TaskItem/index";
import TaskForm from "../TaskForm";
import { useState } from "react";

const TasksList = ({ activities, deleteTask, updateTask, title, addTask, list}) => {
  const [selectedActivity, setSelectedActivity] = useState({ id: 0 });
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const dialogContent = (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogActions>
        <Button onClick={handleDialogClose}>Fechar</Button>
      </DialogActions>
      <DialogTitle>Criar novo cartão</DialogTitle>
      <DialogContent>
        <TaskForm addTask={addTask}  handleCancel={handleDialogClose} list={list.id}/>
      </DialogContent>
    </Dialog>
  );

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleEditStart = () => {
    setIsEditing(true);
  };

  const handleTitleEditEnd = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTitleEditEnd();
    }
  };

  function getActivity(id) {
    const activity = activities.filter((a) => a.id === id);
    setSelectedActivity(activity[0]);
  }

  return (
    <Paper sx={{ m: "0.5rem", width: "100%" }}>
      <Box sx={{ mt: "1rem" }}>
        <Box sx={{ m: "1rem" , display: 'flex', justifyContent: 'space-between'}}>
        {isEditing ? (
          <TextField
            variant="outlined"
            size="small"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleEditEnd}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            onClick={handleTitleEditStart}
          >
            {editedTitle}
          </Typography>
        )}
        <Button size="small" variant="outlined" color="success" onClick={handleDialogOpen}>+ Card</Button>
        {openDialog && dialogContent}
        </Box>

        {activities.map((activ) => (
          <TaskItem
            key={activ.id}
            activ={activ}
            getActivity={getActivity}
            selectedActivity={selectedActivity}
            deleteTask={deleteTask}
            updateTask={updateTask}
            list={list}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TasksList;
