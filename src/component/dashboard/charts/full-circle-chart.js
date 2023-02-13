import React, { useEffect } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const COLORS = ['#BAEDBD', '#C6C7F8', '#95A4FC', '#B1E3FF'];

const FullCircleChart = (props) => {

  const { data } = props;

  const renderLegend =
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection : 'column', justifyContent: "space-between", mb: 4 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex' }} alignItems='center' ><img alt='' height='7px' width='7px' src='/chart/pink-dot.svg' /><Typography variant='body2' sx={{ ml: 0.5, mr: 2 }}>PreviousWeek</Typography></Box>
          <Box sx={{ display: 'flex' }} alignItems='center' ><img alt='' height='7px' width='7px' src='/chart/blue-dot.svg' /><Typography variant='body2' sx={{ ml: 0.5 }}>CurrentWeek</Typography></Box>
        </Box>
      </Box>
    </React.Fragment>

  useEffect(() => {
  }, []);

  return (
    <Card>
      <Typography variant='body1'>Traffic by Location</Typography>
      <ResponsiveContainer width='100%' aspect={1.5}>
        <PieChart >
          <Legend align='right' verticalAlign='middle' content={renderLegend} />
          <Pie
            data={data}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}


export default React.memo(FullCircleChart);