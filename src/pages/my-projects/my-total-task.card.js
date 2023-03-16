import React, { useEffect, useCallback, useMemo, useState } from "react";

// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";

import TaskCard from "~component/core/task-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTaskList } from "~features/tasks/tasks-slice";

export function MyProjectTarget() {
  const dispatch = useDispatch();
  const myTaskList = useSelector((state) => state.tasks.myTaskList);

  useEffect(() => {
    dispatch(fetchMyTaskList());
  }, [dispatch]);

  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Divider
          sx={{ borderColor: "#95A4FC", borderBottomWidth: 5, mb: 3 }}
        ></Divider>
        {myTaskList.length !== 0 &&
          myTaskList.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <TaskCard key={task.taskId} data={task} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default MyProjectTarget;
