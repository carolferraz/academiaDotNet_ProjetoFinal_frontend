import { useState, useEffect } from "react";

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

const activityDefault = {
  id: 0,
  priority: 0,
  title: "",
  description: "",
};

const EditTask = ({
  handleSelection,
  selectedActivity,
  updateTask,
  handleCancel
}) => {
  const [priority, setPriority] = useState("");
  const [activityEdit, setActivityEdit] = useState(selectedActivity);

  useEffect(() => {
    if (selectedActivity.id !== 0) {
      setActivityEdit(selectedActivity);
    }
  }, [selectedActivity]);

  const handleChange = (e) => {
    const selected = e.target.value;
    setPriority(selected);
    handleSelection(selected);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setActivityEdit({ ...activityEdit, [name]: value });
  };

  const handleCancelClick = () => {
    setActivityEdit(activityDefault);
    handleCancel();
  }

  const handleSave = () => {
    updateTask(activityEdit);
    handleCancel();
  };



  return (
    <Box sx={{ width: "100%"}}>
        <TextField
          rows={1}
          sx={{ mr: "1rem", width:'48%' }}
          id="title"
          name="title"
          type="text"
          placeholder="Título"
          value={activityEdit.title}
          onChange={inputChangeHandler}
        />
      <FormControl sx={{ width: "48%" }}>
        <InputLabel id="priority">Selecione</InputLabel>
        <Select
          labelId="priority"
          id="priority"
          name="priority"
          value={activityEdit.priority}
          label="Prioridade"
          onChange={inputChangeHandler}
        >
          <MenuItem value={1}>Baixa</MenuItem>
          <MenuItem value={2}>Normal</MenuItem>
          <MenuItem value={3}>Alta</MenuItem>
        </Select>
      </FormControl>
      <TextField
        multiline
        rows={2}
        sx={{ mt: "1rem", width: '100%' }}
        id="description"
        name="description"
        type="text"
        placeholder="Descrição"
        value={activityEdit.description}
        onChange={inputChangeHandler}
      />
      <Divider sx={{ m: "1rem" }} />
      <Box sx={{ m: "1rem 0", display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="success" onClick={() => {handleSave()}}>
          Salvar
        </Button>
        <Button variant="outlined" color="error" onClick={() => {handleCancelClick(activityEdit)}}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default EditTask;
