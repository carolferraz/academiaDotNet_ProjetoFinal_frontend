import { useState, useEffect } from "react";
import "./styles.css";
import { Box, Button, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import TasksList from "./TasksList/index";
import api from "../../api/api";
import LogoutIcon from "@mui/icons-material/Logout";

const Board = () => {
  const [activities, setActivities] = useState([]);
  const [lists, setLists] = useState([]);

  const addList = async () => {
    try {
      const response = await api.post("List", {
        title: "Adicione um título...",
      });
      const newList = response.data;
      setLists([...lists, newList]);
      setActivities({ ...activities, [newList.id]: [] });
    } catch (error) {
      console.error("Erro ao adicionar lista:", error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await api.delete(`List/${listId}`);

      // Atualiza o estado das listas removendo a lista com o listId correspondente
      setLists(lists.filter((list) => list.id !== listId));

      // Remove as atividades associadas à lista excluída
      const updatedActivities = { ...activities };
      delete updatedActivities[listId];
      setActivities(updatedActivities);
    } catch (error) {
      console.error("Erro ao excluir lista:", error);
    }
  };

  const updateListTitle = async (listId, updatedList) => {
    try {
      await api.put(`List/${listId}`, updatedList);
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          return { ...list, title: updatedList.title };
        }
        return list;
      });

      setLists(updatedLists);
    } catch (error) {
      console.error("Erro ao atualizar título da lista:", error);
    }
  };

  const getAllLists = async () => {
    try {
      const response = await api.get("List");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchListsAndTasks = async () => {
      try {
        const allLists = await getAllLists();
        if (allLists) {
          setLists(allLists);

          const tasksPromises = allLists.map(async (list) => {
            const response = await api.get(`List/${list.id}/tasks`);
            return { listId: list.id, tasks: response.data };
          });

          const tasksForLists = await Promise.all(tasksPromises);
          const tasksObj = tasksForLists.reduce((acc, curr) => {
            acc[curr.listId] = curr.tasks;
            return acc;
          }, {});
          setActivities(tasksObj); // Armazena as tarefas para cada lista individualmente
        }
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };

    fetchListsAndTasks();
  }, []);

  const getAllTasks = async (listId) => {
    const response = await api.get(`List/${listId}/tasks`);
    return response.data.tasks;
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        lists.forEach(async (list) => {
          const listId = list.id ? list.id : list.newList.id;
          const tasks = await getAllTasks(listId);
        });
      } catch (error) {
        console.error("Erro ao obter tarefas:", error);
      }
    };

    getTasks();
  }, [lists]);

  const addTask = async (listId, task) => {
    console.log(listId, task);
    try {
      const response = await api.post(`List/${listId}/tasks`, task);

      const newTask = response.data;

      setActivities((prevActivities) => {
        if (listId in prevActivities) {
          return {
            ...prevActivities,
            [listId]: [...prevActivities[listId], newTask],
          };
        } else {
          return {
            ...prevActivities,
            [listId]: [newTask],
          };
        }
      });
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const deleteTask = async (listId, taskId) => {
    console.log(listId, taskId);
    try {
      await api.delete(`List/${listId}/tasks/${taskId}`);
      const filteredTasks = activities[listId].filter(
        (task) => task.id !== taskId
      );
      setActivities({ ...activities, [listId]: filteredTasks });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const updateTask = async (listId, updatedTask) => {
    console.log(listId, updatedTask);
    try {
      const response = await api.put(
        `List/${listId}/tasks/${updatedTask.id}`,
        updatedTask
      );
      const updated = response.data;
      const updatedTasks = activities[listId].map((task) => {
        if (task.id === updated.id) {
          return updated;
        }
        return task;
      });
      setActivities({ ...activities, [listId]: updatedTasks });
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>Board</Typography>
          <LogoutIcon />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        {lists.map((list) => (
          <Grid item xs={3} key={list.id}>
            <Box
              sx={{
                maxHeight: "100vh",
              }}
            >
              <TasksList
                key={list.id}
                activities={activities[list.id] || []}
                deleteTask={deleteTask}
                updateTask={updateTask}
                addTask={addTask}
                title={list.title}
                list={list}
                deleteList={deleteList}
                updateListTitle={updateListTitle}
              />
            </Box>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button onClick={addList}>Adicionar Lista</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Board;
