import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Material ui
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { isEmptyArr } from '~utils/object-utils';
import chartService from '../../../services/chart-service';

const colors = [
    '#95A4FC',
    '#BAEDBD',
    '#C6C7F8',
    '#B1E3FF',
    '#95A4FC',
    '#A1E3CB',
]

const HorizonarChart = () => {

    const [projectChart, setProjetChart] = React.useState([]);

    React.useEffect(() => {

        async function getProjectGraph() {
            let projectChart = await chartService.getProjectgraph();
            return projectChart;
        }
        const merge = getProjectGraph();
        merge.then((result) => {
            setProjetChart(
                result.data
            )
        })
    }, [])

    return (
        <Card>
            {
                isEmptyArr(projectChart) === false
                    ?
                    <>
                        <Container sx={{ mt: 2, mb: 3 }}><Typography variant='body1'> Project Status </Typography></Container>
                        <ResponsiveContainer width="100%" aspect={1.5} >
                            <BarChart width='100%' height='100%' data={projectChart} barSize={15}
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
                                <XAxis dataKey="status"
                                    tick={{ fontSize: 10 }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={{ stroke: '' }}
                                    type="number"
                                    // tickFormatter={(tick) =>
                                    //     `${Math.ceil(tick) / 1000}`
                                    // }
                                    tickMargin={5}
                                // unit="K"
                                />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" radius={[2, 2, 0, 0]} >
                                    {projectChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </>
                    :
                    null
            }

        </Card >
    );
};
export default HorizonarChart
// export default React.memo(HorizonarChart);