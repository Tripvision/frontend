import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

// Material ui 
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// Redux toolkit 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectByUserId, fetchMyCurrentProject, fetchMyProjectFinanceTotal, fetchMyProjectOurClient } from '~features/projects/projects-slice';


const titleData =
{
    title: 'Our Clients',
    icon: '',
    result: '49',
}


const TitleCard = (props) => {

    const { data } = props

    return (
        <div>

            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ mb: 1.5 }} variant='body2'>
                            {data.title}
                        </Typography>
                        <img alt='' src='/card/Folder.svg' width={24} height={24} />
                    </Box>
                    <Typography variant='h5'>
                        {data.result}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    )
}




const BasicCard = (props) => {

    // 컬러별로 찾기
    const { data } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/projects/1/overview')
    }

    return (
        <Card >
            <CardActionArea onClick={handleClick}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <Typography variant='body1' sx={{ maxWidth: '170px' }} noWrap={true} color={data.textColor} >
                                Poster illustation design
                            </Typography>
                            <Typography variant='body2' noWrap={true}  >
                                Due Date : Nov 10, 2022
                            </Typography>
                        </Box>
                        <Avatar sx={{ width: 56, height: 56, marginLeft: 'auto' }} src='https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=800' />
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 25, height: 25 }} src='https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
                        <Typography variant='body2' color={data.textColor}>{data.state}</Typography>
                    </Box>

                    <Box sx={{ mb: 1 }} color={data.lineColor}>
                        <LinearProgress color='inherit' value={20} variant='indeterminate' />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='body2'>13 / 49 Total Tasks</Typography>
                        <Typography variant='body2'>75% </Typography>
                    </Box>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const data1 = {
    state: 'In Progress',
    textColor: '#8A8CD9',
    lineColor: '#95A4FC',
}
const data2 = {
    state: 'Competed',
    textColor: '#4AA785',
    lineColor: '#BAEDBD',
}
const data3 = {
    state: 'Rejected',
    textColor: 'rgba(255, 255, 255, 0.4)',
    lineColor: 'rgba(0,0,0,0.4)',
}

const ProjectsOverView = () => {


    const dispatch = useDispatch();
    const projectList = useSelector(state => state.projects.projects);
    const metaData = useSelector(state => state.projects.meta)

    useEffect(() => {
        dispatch(fetchProjectByUserId());
    },[dispatch]);

    useEffect(() => {
        dispatch(fetchMyCurrentProject());
    },[dispatch]);

    useEffect(() => {
        dispatch(fetchMyProjectFinanceTotal());
    },[dispatch]);

    useEffect(() => {
        dispatch(fetchMyProjectOurClient());
    },[dispatch]);
        
    return (
        <div>
            <Grid container spacing={3} mt={3}>

                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                >
                    <Stack spacing={3}>
                        <TitleCard data={titleData}/>
                        <BasicCard data={data1} />
                        <BasicCard data={data1} />
                        <BasicCard data={data1} />
                        <BasicCard data={data1} />
                        <BasicCard data={data1} />
                        <BasicCard data={data1} />
                        <BasicCard data={data1} />
                    </Stack>
                </Grid>

                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                >

                    <Stack spacing={3}>
                        <TitleCard data={titleData}/>
                        <BasicCard data={data2} />
                        <BasicCard data={data2} />
                        <BasicCard data={data2} />
                        <BasicCard data={data2} />
                        <BasicCard data={data2} />
                        <BasicCard data={data2} />
                        <BasicCard data={data2} />
                    </Stack>
                </Grid>

                <Grid item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                >
                    <Stack spacing={3}>

                        <TitleCard data={titleData}/>
                        <BasicCard data={data3} />
                        <BasicCard data={data3} />
                        <BasicCard data={data3} />
                        <BasicCard data={data3} />
                        <BasicCard data={data3} />
                        <BasicCard data={data3} />
                        <BasicCard data={data3} />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProjectsOverView;