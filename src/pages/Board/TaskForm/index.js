import { useState} from "react";
import {
  Box,
  Input,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";


const TaskForm = ({ list, addTask, handleSelection }) => {
  const [priority, setPriority] = useState("");
  //const [lastId, setLastId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePriorityChange = (e) => {
    const selected = e.target.value;
    setPriority(selected);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleAddTask = () => {
    const task = {
      title: title,
      description: description,
      priority: priority,
      listId: list
    };

    addTask(list, task);

    setPriority("");
    setTitle("");
    setDescription("");
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Typography>
        Atividade
      </Typography>
      <FormControl sx={{ width: "15%" }}>
        <InputLabel id="priority">Selecione</InputLabel>
        <Select
          labelId="priority"
          id="priority"
          name="priority"
          value={priority}
          label="Selecione"
          onChange={handlePriorityChange}
        >
          <MenuItem value={1}>Baixa</MenuItem>
          <MenuItem value={2}>Normal</MenuItem>
          <MenuItem value={3}>Alta</MenuItem>
        </Select>
      </FormControl>
      <Input
        sx={{ m: "1rem" }}
        id="title"
        name="title"
        type="text"
        placeholder="title"
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        multiline
        rows={2}
        sx={{ m: "1rem" }}
        id="description"
        name="description"
        type="text"
        placeholder="description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <Divider sx={{ m: "1rem" }} />
      <Box sx={{ m: "1rem 0" }}>    
          <Button variant="contained" color="success" onClick={handleAddTask}>
            Adicionar cartão
          </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
