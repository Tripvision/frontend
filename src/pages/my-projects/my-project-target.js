import React, { useEffect, useCallback, useMemo, useState } from 'react'

// Material ui 
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material'

import TaskCard from '~component/core/task-card'
import { useDispatch, useSelector } from 'react-redux'
import taskService from '~services/task-service'
import { useParams } from 'react-router-dom'
import { fetchTaskListByProjectId } from '~features/tasks/tasks-slice'


export function MyProjectTarget() {

    const dispatch = useDispatch();

    const { id } = useParams();

    const yetTaskList = useSelector(state => state.tasks.statusList.YET);
    const progressTaskList = useSelector(state => state.tasks.statusList.PROGRESS);
    const completedTaskList = useSelector(state => state.tasks.statusList.COMPLETED);

    useEffect(() => {
        dispatch(fetchTaskListByProjectId(id));
    }, []);

    return (
        <Container fixed >
            <Grid container spacing={3}>
                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                >
                    <Box sx={{ display: 'flex' }}><Typography mr={1} >Yet to Start</Typography><Typography color="text.secondary">{yetTaskList.length}</Typography></Box>
                    <Divider sx={{ borderColor: '#A1E3CB', borderBottomWidth: 5, mb: 3, borderRadius: 3 }}></Divider>
                    <Stack spacing={3}>
                        {
                            yetTaskList.map(task => (
                                task.taskId === null ? 
                                <>
                                </>
                                :
                                <TaskCard
                                    key={task.taskId}
                                    data={task}
                                />
                                
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}>
                    <Box sx={{ display: 'flex' }}><Typography mr={1} >In Progress</Typography><Typography color="text.secondary">{progressTaskList.length}</Typography></Box>
                    <Divider sx={{ borderColor: '#C6C7F8', borderBottomWidth: 5, mb: 3 }}></Divider>
                    <Stack spacing={2}>
                        {
                            progressTaskList.map(task => (
                                task.taskId === null ? 
                                <>
                                </>
                                :
                                <TaskCard
                                    key={task.taskId}
                                    data={task}
                                />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}>
                    <Box sx={{ display: 'flex' }}><Typography mr={1} >Completed</Typography><Typography color="text.secondary">{completedTaskList.length}</Typography></Box>
                    <Divider sx={{ borderColor: '#95A4FC', borderBottomWidth: 5, mb: 3 }}></Divider>
                    <Stack spacing={2}>
                        {
                            completedTaskList.map(task => (
                                task.taskId === null ? 
                                <>
                                </>
                                :
                                <TaskCard
                                    key={task.taskId}
                                    data={task}
                                />
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MyProjectTarget
