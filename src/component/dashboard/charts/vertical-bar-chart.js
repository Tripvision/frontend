import React, { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Material ui 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

const VerticalBarChart = ({ object }) => {

    const { wrapData } = object;

    const [activeIndex,setActiveIndex] = useState(0);

    const changeIndex = (data,index) => {
        setActiveIndex(
            index
        )
    }
    



    return (
        <Card>
            <Container sx={{ mt:2 , mb: 1 }}><Typography variant='body1'> Traffic by WebSite </Typography></Container>
            <ResponsiveContainer width='100%' height='100%' aspect={1}>
                <BarChart layout='vertical' width='100%' height='100%' data={wrapData} barSize={10}>
                    <XAxis type="number" hide='true' />
                    <Tooltip hide='true' />
                    <YAxis dataKey="name" type="category"
                        tickLine={false}
                        axisLine={{ stroke: '' }}
                        tick={{fontSize: 10}}
                    />
                    <Bar dataKey="value" radius={[0, 5, 5, 0]} onClick={changeIndex}>
                        {wrapData.map((entry, index) => (
                            <Cell cursor="pointer" fill={index === activeIndex ? '#C6C7F8' : '#565957'} key={`cell-${index}`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default React.memo(VerticalBarChart)