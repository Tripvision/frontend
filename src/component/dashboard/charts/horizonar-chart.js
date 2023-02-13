import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Material ui
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

const colors = [
    '#95A4FC',
    '#BAEDBD',
    '#C6C7F8',
    '#B1E3FF',
    '#95A4FC',
    '#A1E3CB',
]

const HorizonarChart = (props) => {
    const { data } = props;
    return (
        <Card>
            <Container sx={{ mt:2 , mb: 3 }}><Typography variant='body1'> Traffic by Device </Typography></Container>
            <ResponsiveContainer width="100%" aspect={1.5} >
                <BarChart width='100%' height='100%' data={data} barSize={20}
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
                    <XAxis dataKey="name" 
                        tick={{fontSize: 10}}
                        tickLine={false}
                    
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={{ stroke: '' }}
                        type="number"
                        tickFormatter={(tick) =>
                            `${Math.ceil(tick) / 1000}`
                        }
                        tickMargin={5}
                        unit="K"

                    />
                    <Tooltip />
                    <Bar dataKey="uv" fill="#8884d8" radius={[2, 2, 0, 0]} >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`}  fill={colors[index]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
//export default HorizonarChart;
export default React.memo(HorizonarChart);