import React, { useState } from 'react'

// Material ui
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'


// Refactor : value 값 Redux 에서 받아와서 바인딩 해주기 
export default function LineProgressBar() {

    const [value, setValue] = useState(22300);
    const MAX = 36000;
    const MIN = 0;
    const normalise = (nowValue) => ((nowValue - MIN) * 100) / (MAX - MIN);

    return (
        <Box mb={3} > 
            <Card sx={{ width: '100%', minHeight: 130, display : 'flex', flexDirection : 'column', justifyContent : 'center' }} >
                <CardContent >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb={1}>
                        <Typography>Budget</Typography>
                        <Typography>{value} of {MAX} Used</Typography>
                    </Box>
                    <LinearProgress sx={{height:'7px',  borderRadius : '2px' }} color='secondary' value={normalise(value)} variant='determinate' />
                    <Typography mt={1} color="text.secondary"> 14 Targets are remaining </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

