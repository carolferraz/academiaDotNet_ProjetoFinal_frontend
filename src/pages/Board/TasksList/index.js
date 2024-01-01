import { Box, Paper } from "@mui/material";
import TaskItem from "../TaskItem/index";
import { useState } from "react";

const TasksList = ({ activities, deleteTask, updateTask }) => {
  const [selectedActivity, setSelectedActivity] = useState({ id: 0 });

  function getActivity(id) {
    const activity = activities.filter((a) => a.id === id);
    setSelectedActivity(activity[0]);
  }
  

  return (
    <Paper sx={{ m: "2rem", width: "100%" }}>
      <Box sx={{ mt: "2rem" }}>
        {activities.map((activ) => (
          <TaskItem
            key={activ.id}
            activ={activ}
            deleteTask={deleteTask}
            getActivity={getActivity}
            selectedActivity={selectedActivity}
            updateTask={updateTask}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TasksList;
