import React, { useEffeect } from 'react';

// Material ui 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

// React router
import {
    Link as RouterLink,
} from 'react-router-dom';


const typeList = ['project', 'task', 'member', 'product'];
const prefix = '/card/';

const iconCard = [
    {
        id:'1',
        title: 'Total Projects',
        type: 'project',
        result: 29,
        to : '/projects/overview'
    },
    {
        id:'2',
        title: 'Total Tasks',
        type: 'task',
        result: 715,
        to : '/tasks'
    },
    {
        id:'3',
        title: 'Members',
        type: 'member',
        result: 31,
        to : '/connect-memers'
    },
    {
        id:'4',
        title: 'Productivity',
        type: 'product',
        result: "93.8%",
        subResult: '+1.48',
        subIcon: 'upArrow',
        to : '/Productivity'
    }
]


// Refactor : props 를 전체로 받는 행위
// Refactor : Redux Toolkit 으로 값 useSelector 해와서 렌더링 합시다.
// Refactor : s3 에 저장된 경로만 출력합시다.

const MuiIconCard = () => {

    const data = iconCard;

    const addSrc = data.map(item => {
        typeList.map((type, idx) => {
            if (item.type === type) {
                item.src = prefix + type + '.svg'
            }
        })
        return item;
    });


    return (
        <Grid
            container
            spacing={2}
            direction="row"
            mb={3}
            mt={3}
        >
            {
                addSrc.map((item, index) => (
                    <Grid item
                        key={item.id}
                        xs={12}
                        sm={12 / data.length * 2}
                        md={12 / data.length}
                        lg={12 / data.length}
                        xl={12 / data.length}
                    >
                        <Card>
                            <CardActionArea component={RouterLink} to={item.to} >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography gutterBottom variant="body2" component="div">
                                            {item.title}
                                        </Typography>
                                        <Avatar alt="Remy Sharp" src={item.src} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1" color="text.secondary">
                                            {item.result}
                                        </Typography>
                                        {
                                            item.hasOwnProperty('subResult') === true &&
                                            <Typography variant="body2">{item.subResult}</Typography>
                                        }
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default MuiIconCard;