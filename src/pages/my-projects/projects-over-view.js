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
import { fetchProjectListByUserId, fetchMyProjectSituation } from '~features/projects/projects-slice';


const TitleCard = (props) => {

    const { data } = props


    return (
        <div>
            {
                data[1] === null ?

                    <>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ mb: 1.5 }} variant='body2'>
                                        {data[0]}
                                    </Typography>
                                    <img alt='' src='/card/Folder.svg' width={24} height={24} />
                                </Box>
                                <Typography variant='h5'>
                                    아직 없는 값입니다.
                                </Typography>
                            </CardContent>
                        </Card>
                    </> :

                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ mb: 1.5 }} variant='body2'>
                                    {data[0]}
                                </Typography>
                                <img alt='' src='/card/Folder.svg' width={24} height={24} />
                            </Box>
                            <Typography variant='h5'>
                                {data[1]}
                            </Typography>
                        </CardContent>
                    </Card>
            }


        </div>
    )
}




const BasicCard = (props) => {

    // 컬러별로 찾기
    const { data } = props;
    const memberList = data.memberList;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/projects/' + data.projectId + '/overview', { state: { index: 0 } })
    }

    return (
        <Card >
            <CardActionArea onClick={handleClick}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box>
                            <Typography variant='body1' sx={{ maxWidth: '170px' }} noWrap={true} color={data.textColor} >
                                {data.projectName}
                            </Typography>
                            <Typography variant='body2' noWrap={true}  >
                                Due Date : {data.projectDueDate}
                            </Typography>
                        </Box>
                        <Avatar sx={{ width: 56, height: 56, marginLeft: 'auto' }} src='https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=800' />
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        {
                            memberList.map(member => (
                                <>
                                    <Avatar sx={{ width: 25, height: 25 }} src={member.memberAvatarUrl} />
                                </>
                            ))
                        }

                        <Typography variant='body2' color={data.textColor}>{data.state}</Typography>
                    </Box>

                    <Box sx={{ mb: 1 }} color={data.lineColor}>
                        <LinearProgress color='inherit' value={20} variant='indeterminate' />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='body2'>{data.completeTaskCount} / {data.totalTaskCount} Total Tasks</Typography>
                        <Typography variant='body2'>{data.taskPercent} </Typography>
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
        dispatch(fetchProjectListByUserId());
        dispatch(fetchMyProjectSituation());
    }, [dispatch]);

    React.useEffect(() => {
        console.log(projectList);
        console.log(metaData);
    })


    return (
        <div>
            <Grid container spacing={3} mt={3}>

                {Object.entries(metaData).map((value, index) => {
                    return (
                        <Grid item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={4}
                            key={index}
                        >
                            <TitleCard data={value} />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container spacing={3} mt={3}>
                {
                    projectList.map(project => (
                        <Grid item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={4}
                            index={project.projectId}
                        >
                            <BasicCard data={project} />
                        </Grid>
                    ))
                }
            </Grid>
        </div >
    );
};

export default ProjectsOverView;