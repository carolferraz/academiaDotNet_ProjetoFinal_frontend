import { useState, useEffect } from "react";
import "./styles.css";
import { Box, Button } from "@mui/material";
import TasksList from "./TasksList/index";
import api from "../../api/task";

const Board = () => {
  const [activities, setActivities] = useState([]);
  const [lists, setLists] = useState([]);

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
          setActivities(tasksObj); // Armazenar as tarefas para cada lista individualmente
        }
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };

    fetchListsAndTasks();
  }, []);

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

  const getAllTasks = async (listId) => {
    const response = await api.get(`List/${listId}/tasks`);
    return response.data.tasks; // Presumindo que 'tasks' seja o array de objetos de tarefas dentro da resposta
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        lists.forEach(async (list) => {
          const tasks = await getAllTasks(list.id);
          // Faça o que você precisa com as tarefas, por exemplo:
          console.log(tasks);
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

      const newTask = response.data.newKanbanTask;

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
    console.log(listId, updatedTask)
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

  console.log(activities);
  return (
    <Box>
      {/* <TaskForm addTask={addTask} /> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
          width: "100%",
        }}
      >
        {lists.map((list) => (
          <TasksList
            key={list.id}
            activities={activities[list.id] || []}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addTask={addTask}
            title={list.title}
            list={list}
          />
        ))}
        <Button onClick={addList}>Adicionar Lista</Button>
      </Box>
    </Box>
  );
};
export default Board;
