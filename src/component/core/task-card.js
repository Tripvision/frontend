import React, { useEffect, useCallback, useMemo, useState } from 'react'

// Material ui 
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material'

import BasicModal from '~pages/modal'

const TaskCard = () => {
    const theme = useTheme(); 

    const [open, setOpen] = useState(false);

    useEffect(() => {
      console.log("TaskCard open " + open);
    });


    return (
        <Card >
            <CardActionArea onClick={() => {setOpen(true)}}>
            <CardContent>
                <BasicModal
                    open={open} 
                    setOpen={setOpen}
                />
                <Chip color="secondary" label="Chip Filled" size="small" sx={{ borderRadius: '5px', mb: 1.5 }} />
                <Typography noWrap={true} >
                    Meeting with customer
                </Typography>
                <Typography variant='body2' gutterBottom color="text.secondary" maxWidth={230}
                    sx={{
                        wordWrap: 'break-word',
                    }}>
                First, a disclaimer - the entire process writing a blog post often takes a couple
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Avatar src='' alt='' sx={{ width: 25, height: 25 }} />
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} mr={1}>
                        {theme.palette.mode === 'dark' ? (
                            <img width='12px' height='12px' src="/card/black-clip.svg" />
                        ) : (
                            <img width='12px' height='12px' src="/card/white-clip.svg" />
                        )}
                        <Typography ml={0.5} variant='body2' color='text.secondary'>6</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
                        {theme.palette.mode === 'dark' ? (
                            <img width='12px' height='12px' src="/card/black-chat-text.svg" />
                        ) : (
                            <img width='12px' height='12px' src="/card/white-chat-text.svg" />
                        )}
                        <Typography ml={0.5} variant='body2' color='text.secondary' > 8</Typography>
                    </Box>
                </Box>
            </Box>
        </CardContent>
        </CardActionArea>
        </Card >
    )
};

export default TaskCard;