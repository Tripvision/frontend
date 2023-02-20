import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';



// Component 
import HorizonarChart from '~component/dashboard/charts/horizonar-chart';
import FullCircleChart from '~component/dashboard/charts/full-circle-chart';
import VerticalBarChart from '~component/dashboard/charts/vertical-bar-chart';
import HorizonLineChart from '~component/dashboard/charts/horizon-line-chart';
import MuiIconCard from '~component/core/mui-icon-card';
import { useDispatch, useSelector } from 'react-redux';

// dispatch
import { fetchProjectStatus } from '../features/projects/projects-slice';
import { fetchMyTopBudgets } from '../features/budget/budget-slice';
import { contact, fetchMyContactsPosition } from '../features/contact/contact-slice';


const lineChartData = [
    {
        name: 'Mon',
        CurrentWeek: 4000,
        PreviousWeek: 2400,
        amt: 2400,
    },
    {
        name: 'Tue',
        CurrentWeek: 3000,
        PreviousWeek: 1398,
        amt: 2210,
    },
    {
        name: 'Wed',
        CurrentWeek: 2000,
        PreviousWeek: 9800,
        amt: 2290,
    },
    {
        name: 'Thu',
        CurrentWeek: 2780,
        PreviousWeek: 3908,
        amt: 2000,
    },
    {
        name: 'Fri',
        CurrentWeek: 1890,
        PreviousWeek: 4800,
        amt: 2181,
    },
    {
        name: 'Sat',
        CurrentWeek: 2390,
        PreviousWeek: 3800,
        amt: 2500,
    },
    {
        name: 'Sun',
        CurrentWeek: 3490,
        PreviousWeek: 4300,
        amt: 2100,
    },
];

const HorizonBarChartdata = [
    {
        "name": "Linux",
        "uv": 3000000,
    },
    {
        "name": "Mac",
        "uv": 5200000,
    },
    {
        "name": "iOS",
        "uv": 3000000,
    },
    {
        "name": "Windows",
        "uv": 7200000,
    },
    {
        "name": "Android",
        "uv": 2200000,
    },
    {
        "name": "Ohter",
        "uv": 5800000,
    },
]

const circleData = [
    { name: 'United States', value: 386 },
    { name: 'Canada', value: 225 },
    { name: 'Mexico', value: 308 },
    { name: 'Other', value: 200 },
];

const verticalBarChartData = {
    wrapData: [
        {
            "name": "Google",
            "value": 800
        },
        {
            "name": "Youtube",
            "value": 400
        },
        {
            "name": "Instagram",
            "value": 550
        },
        {
            "name": "Pinterest",
            "value": 300
        },
        {
            "name": "Facebook",
            "value": 700
        },
        {
            "name": "Twitter",
            "value": 370
        },
        {
            "name": "Tumblr",
            "value": 550
        }
    ],
    activeIndex: 0,
};




const Project = () => {

    const dispatch = useDispatch();

    const contactMemberPosition = useSelector(state => state.contacts);
    const myTopBudgets = useSelector(state => state.budget);
    const myProjectsStatus = useSelector(state => state.projects);

    useEffect(() => {
        dispatch(fetchMyContactsPosition());
        dispatch(fetchMyTopBudgets());
        dispatch(fetchProjectStatus());
    },[dispatch])


    return (
        <div>
            <Container>
                {/* Today */}
                <MuiIconCard />

                {/* Total */}
                <Grid container spacing={2} mb={3}>

                    {/* Total */}
                    <Grid item
                        xs={12}
                        sm={8.4}
                        md={8.4}
                        lg={8.4}
                        xl={8.4}
                    >
                        <HorizonLineChart data={lineChartData} />

                    </Grid>

                    {/* Traffic by Website (가로 막대 차트) */}
                    <Grid item
                        xs={12}
                        sm={3.6}
                        md={3.6}
                        lg={3.6}
                        xl={3.6}
                    >
                        <VerticalBarChart object={verticalBarChartData} />

                    </Grid>

                </Grid>

                <Grid container spacing={2} mb={3} >


                    {/* Traffic by device (BarChart ) */}
                    <Grid item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <HorizonarChart data={HorizonBarChartdata} />
                    </Grid>


                    {/* Traffic by location (원형 차트) */}
                    <Grid item

                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <FullCircleChart data={circleData} />

                    </Grid>

                </Grid>

                {/* Marketing & SEO */}

            </Container>
        </div>
    );
};

export default Project;

