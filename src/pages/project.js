import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';



// Component 
import HorizonarChart from '~component/dashboard/charts/horizonar-chart';
import FullCircleChart from '~component/dashboard/charts/full-circle-chart';
import VerticalBarChart from '~component/dashboard/charts/vertical-bar-chart';
import HorizonLineChxart from '~component/dashboard/charts/horizon-line-chart';
import MuiIconCard from '~component/core/mui-icon-card';
import { useDispatch, useSelector } from 'react-redux';
// dispatch
import { fetchMyTopBudgets } from '../features/budget/budget-slice';
import { contact, fetchMyContactsPosition } from '../features/contact/contact-slice';
import chartService from '../services/chart-service';
import { isEmptyArr } from '~utils/object-utils';


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




const Project = () => {

    const dispatch = useDispatch();
    const [chart, serChart] = React.useState({
        budgetChart: {
            wrapData: [

            ]
        },
        projectChart: {

        },
        connectGraph: {

        },
    });
    React.useEffect(() => {
        // async function getChartData() {
        //     let res = {};
        //     let budgetChart = await chartService.getBudgetGraph();
        //     res = {
        //         ...res,
        //         ['budgetChart']: {
        //             ['wrapData']: budgetChart.data
        //         }
        //     }
        //     let projectChart = await chartService.getProjectgraph();
        //     res = {
        //         ...res,
        //         ['projectChart']: projectChart.data
        //     }
        //     let connectGraph = await chartService.getConnectgraph();
        //     res = {
        //         ...res,
        //         ['connectGraph']: connectGraph.data
        //     }
        //     return res;
        // }
        // const merge = getChartData();
        // merge.then((result) => {
        //     serChart({
        //         ...chart,
        //         ...result
        //     })
        // })

    }, []);




    return (
        <div>
            <Container>
                {/* Today */}
                <MuiIconCard />

                {/* Total */}
                <Grid container spacing={2} mb={3}>

                    {/* Total Users */}
                    <Grid item
                        xs={12}
                        sm={8.4}
                        md={8.4}
                        lg={8.4}
                        xl={8.4}
                    >
                        {/* <HorizonLineChart data={chart.projectChart} /> */}

                    </Grid>

                    {/* Traffic by Website (가로 막대 차트) */}
                    <Grid item
                        xs={12}
                        sm={3.6}
                        md={3.6}
                        lg={3.6}
                        xl={3.6}
                    >
                        <VerticalBarChart />

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
                        <HorizonarChart />

                    </Grid>


                    {/* Traffic by location (원형 차트) */}
                    <Grid item

                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <FullCircleChart/>

                    </Grid>

                </Grid>

                {/* Marketing & SEO */}

            </Container>
        </div>
    );
};

export default Project;

