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
import {
  SentimentDissatisfied as DissatisfiedIcon,
  SentimentNeutral as NeutralIcon,
  SentimentSatisfied as SatisfiedIcon,
} from "@mui/icons-material";
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

  const setIconPriority = (param) => {
    switch (param) {
      case 1:
        return <SatisfiedIcon sx={{ fontSize: "medium", mr: "0.25rem" }} />;
      case 2:
        return <NeutralIcon sx={{ fontSize: "medium", mr: "0.25rem" }} />;
      case 3:
        return <DissatisfiedIcon sx={{ fontSize: "medium", mr: "0.25rem" }} />;
      default:
        return <NeutralIcon sx={{ fontSize: "medium", mr: "0.25rem" }} />;
    }
  };
  const setPriority = (param) => {
    switch (param) {
      case 1:
        return "Baixa";
      case 2:
        return "Normal";
      case 3:
        return "Alta";
      default:
        return "Não definida";
    }
  };

  return (
    <Paper sx={{ mt: "0.5rem", m: "1rem", p: "1rem" }} elevation={6}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="inherit'">
            Prioridade: {setIconPriority(priority)}
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
          variant="outlined"
          sx={{ fontSize: "small" }}
          onClick={handleDialogOpen}
        >
          <EditIcon sx={{ fontSize: "medium", marginRight: "0.5rem" }} />
          Editar
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ fontSize: "small" }}
          onClick={() => deleteTask(list.id, activ.id)}
        >
          <DeleteIcon sx={{ fontSize: "medium", marginRight: "0.5rem" }} />{" "}
          Deletar
        </Button>
        {selectedActivity ? dialogContent : console.log(selectedActivity.id)}
      </Box>
    </Paper>
  );
};

export default TaskItem;
