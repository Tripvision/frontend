import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Material ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';


const HorizonLineChart = (props) => {
    const { data } = props;

    const renderLegend =
        <React.Fragment>
            <Box sx={{display:'flex', justifyContent : "space-between", mb:4 }}>
                <Typography variant='body1'>Total Users</Typography>
                <Box  sx={{display:'flex'}}>
                    <Box sx={{display:'flex'}} alignItems='center' ><img height='7px' width='7px' src='/chart/pink-dot.svg'/><Typography variant='body2' sx={{ml:0.5, mr:2}}>PreviousWeek</Typography></Box>
                    <Box sx={{display:'flex'}} alignItems='center' ><img height='7px' width='7px' src='/chart/blue-dot.svg'/><Typography variant='body2' sx={{ml:0.5}}>CurrentWeek</Typography></Box>
                </Box>
            </Box>
        </React.Fragment>

    return (
        <Card>
            <ResponsiveContainer width="100%" height="100%" aspect={2}>
                <LineChart
                    width='100%'
                    height='100%'
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#888c89"
                        strokeDasharray="0.1 0.1 0.1"
                    />
                    <XAxis
                        tickLine={false}
                        dataKey="name"
                        fontSize={10}
                        interval="preserveStartEnd"
                        dx={20}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={{ stroke: '' }}
                        type="number"
                        fontSize={10}
                    />
                    <Tooltip />
                    <Legend
                        verticalAlign='top'
                        content={renderLegend}
                    />
                    <Line dot={false} stroke='#A8C5DA' strokeWidth={3} type="monotone" dataKey="PreviousWeek" activeDot={{ r: 8 }} />
                    <Line dot={false} stroke='#C6C7F8' strokeWidth={3} type="monotone" dataKey="CurrentWeek" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default React.memo(HorizonLineChart);