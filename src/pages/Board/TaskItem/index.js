import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EditTask from "./EditTask";

const TaskItem = ({
  activ,
  deleteTask,
  getActivity,
  selectedActivity,
  updateTask,
  list,
}) => {
  const { id, title, priority, description } = activ;
  const [openDialog, setOpenDialog] = useState(false);


  const handleDialogOpen = () => {
    getActivity(id);
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
      <DialogTitle>Editar Atividade</DialogTitle>
      <DialogContent>
        <EditTask selectedActivity={selectedActivity} updateTask={updateTask} handleCancel={handleDialogClose} list={list}/>
      </DialogContent>
    </Dialog>
  );

  const setPriority = (param) => {
    switch (param) {
      case 1:
        return " Baixa";
      case 2:
        return " Normal";
      case 3:
        return " Alta";
      default:
        return " Não definida";
    }
  };

  const setPriorityColor = (param) => {
    switch (param) {
      case 1:
        return "success";
      case 2:
        return "primary";
      case 3:
        return "error";
      default:
        return "disable";
    }
  };

  return (
    <Paper sx={{ mt: "0.5rem", m: "1rem", p: "1rem"}} elevation={6}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography fontSize="small" variant="body2" color={setPriorityColor(priority)}>
            <PriorityHighIcon fontSize="small"/>
            {setPriority(priority)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: "0.5rem" }}>
        <Typography variant="string" sx={{ wordWrap: "break-word" }}>
          {description}
        </Typography>
      </Box>
      <Divider sx={{ m: "1rem" }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <Button
          sx={{ fontSize: "small" }}
          onClick={handleDialogOpen}
        >
          <EditIcon sx={{ fontSize: "medium", marginRight: "0.5rem" }} />
        </Button>
        <Button
          color="error"
          sx={{ fontSize: "small" }}
          onClick={() => deleteTask(list.id, activ.id)}
        >
          <DeleteIcon sx={{ fontSize: "medium", marginRight: "0.5rem" }} />
        </Button>
        {selectedActivity ? dialogContent : console.log(selectedActivity.id)}
      </Box>
    </Paper>
  );
};

export default TaskItem;
