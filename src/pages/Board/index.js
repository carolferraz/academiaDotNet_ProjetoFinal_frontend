import { useState, useEffect } from "react";
import "./styles.css";
import { Box } from "@mui/material";
import TaskForm from "./TaskForm/index";
import TasksList from "./TasksList/index";
import api from "../../api/task";

const Board = () => {
  const [activities, setActivities] = useState([]);

  const getAllTasks = async () => {
    const response = await api.get("List/1/tasks");
    return response.data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const allTasks = await getAllTasks();
      if (allTasks) setActivities(allTasks);
    };

    getTasks();
  }, []);

  const addTask = async (task) => {
    console.log(task);
    const response = await api.post("List/1/tasks", task);
    setActivities([...activities, response.data.newKanbanTask]);
  };

  const deleteTask = async (id) => {
    if (await api.delete(`List/1/tasks/${id}`)) {
      const filterActivity = activities.filter((activ) => activ.id !== id);
      setActivities([...filterActivity]);
    }
  };

const updateTask = async (ativ) => {
  const response = await api.put(`List/1/tasks/${ativ.id}`, ativ);
  const { id } = response.data;
    setActivities(
      activities.map((item) => (item.id === id ? response.data : item))
    );
  }

// const updateTask = async (ativ) => {
//   try {
//     const response = await api.put(`List/1/tasks/${ativ.id}`, ativ);
//     const updatedTask = response.data;

//     setActivities((prevActivities) =>
//       prevActivities.map((item) =>
//         item.id === updatedTask.id ? updatedTask : item
//       )
//     );
//   } catch (error) {
//     console.error("Erro ao atualizar tarefa:", error);
//   }
// };

  console.log(activities);
  return (
    <Box className="containerList">
      <TaskForm addTask={addTask} />
      {/*Aqui virá a propriedade colunm do banco e farei um map para adicionar novas colunas ao clicar no botão +.*/}
      <TasksList
        activities={activities}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </Box>
  );
};
export default Board;
