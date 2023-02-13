import React, { useState } from 'react';

// Material ui 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';



const filedData = [
    {
        title: 'Project tech requirements.pdf',
        size: '5.6 MB',
        date: '2 days ago',
        uploader: 'Karina Clark',
    },
    {
        title: 'Dashboard-design.jpg',
        size: '2.3 MB',
        date: 'Due in 1 day',
        uploader: 'Marcus Blake',
    },
    {
        title: 'Create FureStibe branding proposal.zip',
        size: '4.6 MB',
        date: 'Due in 1 day',
        uploader: 'Terry Barry',
    },
    {
        title: 'Completed Project Stylings.pdf',
        size: '1.2 MB',
        date: 'Due in 3 day',
        uploader: 'Roth Bloom',
    },
    {
        title: 'Create Project Wireframes.xls',
        size: '2.8 MB',
        date: 'Due in 3 day',
        uploader: 'Natali Craig',
    },
]

export const FilesCard = (props) => {
    const [show, setShow] = useState(false);
    const { data } = props;
    return (
        <>
            <Card>
                <CardContent>
                    {
                        data.map(item => (
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start"
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.title}
                                        secondary={
                                            <Box>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {item.size} /
                                                </Typography>
                                                <Typography component="span" variant="body2"> {item.date}</Typography>
                                                <Typography component="span" variant="body2">{item.uploader}</Typography>
                                                {"  I'll be in your neighborhood doing errands this…"}
                                            </Box>
                                        }
                                    />
                                    {show && <Typography> exit </Typography>}
                                </ListItem>
                            </List>
                        ))
                    }
                </CardContent>
            </Card>
            <Divider />
        </>
    )
}

export const filesCard = () => {
    return (
        <>

        </>
    )
}



const OverViewData = {
    title: 'Coffee detila Page',
    status: '51%',
    totalTasks: '48',
    comTasks: '14',
    budgetSpent: '15,000',
    members: [
        {
            name: 'sara',
            email: 'ehdqn119@gmail.com',
        },
        {
            name: 'Yura',
            email: 'ehdqn119@gmail.com',
        }, {
            name: 'Sindy',
            email: 'ehdqn119@gmail.com',
        }
    ]
}

export const OverViewCard = (props) => {
    const { data } = props;
    return (
        <>
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>{data.title}</Typography>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <Box sx={{ display: 'flex', width: '100%', justifyContent : 'space-around', flex : 1 }}>
                                <Box>
                                    <Typography>Status</Typography>
                                    <Typography>Line Prgoress</Typography>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem />

                                <Box>
                                    <Typography>Total Tasks</Typography>
                                    <Typography>15 / 48</Typography>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Box>
                                    <Typography>Due Date</Typography>
                                    <Typography>29 Jan, 2022</Typography>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Box>
                                    <Typography>Budget Spent</Typography>
                                    <Typography>$15000</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ marginLeft: 'auto' }}>
                                <Avatar src="" alt="d" sx={{ marginLeft: 'auto', width: 42, height: 42 }} />
                                {/* 리팩토링 대상 */}
                                <AvatarGroup max={4}
                                    sx={{
                                        '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 15 },
                                    }}
                                >
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 20, height: 20 }} />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 20, height: 20 }} />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 20, height: 20 }} />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" sx={{ width: 20, height: 20 }} />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" sx={{ width: 20, height: 20 }} />
                                </AvatarGroup>
                            </Box>
                        </Box>

                    </Box>
                </CardContent>
            </Card>
            <Divider />
        </>
    )
}





const data = [
    {
        title: 'Edited the details of Project X',
        time: '5am ago',
    },
    {
        title: 'Changed the status of Project X',
        time: '1:32 AM',
    },
    {
        title: 'Submitted a bug',
        time: 'Yesterday 12:39 AM',
    },
    {
        title: 'Modified a date in Page X',
        time: 'Last Thursday 3:34 AM',
    },
    {
        title: 'Deleted a page in Project X',
        time: 'Aug 11',
    },
];

export function CalenderCard(props) {

    const { data } = props;

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Box mb={1}>
                    <Typography>What's on the road?</Typography>
                    <Box>
                    </Box>
                </Box>
                <Box>
                    {data.map(item => (
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start"
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title}
                                    secondary={
                                        <Box>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            >
                                                {item.size} /
                                            </Typography>
                                            <Typography component="span" variant="body2"> {item.date}</Typography>
                                            <Typography component="span" variant="body2">{item.uploader}</Typography>
                                            {"  I'll be in your neighborhood doing errands this…"}
                                        </Box>
                                    }
                                />
                            </ListItem>
                        </List>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

const MyProjectOverView = () => {
    return (
        <div>
            <OverViewCard data={OverViewData} />
            <Grid container spacing={3}>
                <Grid item
                    xs={12}
                    md={6}
                    lg={6}
                    xl={6}
                >
                    <CalenderCard data={data} />
                </Grid>
                <Grid item
                    xs={12}
                    md={6}
                    lg={6}
                    xl={6}
                >
                    <FilesCard data={filedData} />
                </Grid>
            </Grid>
        </div>
    );
}

export default MyProjectOverView;
