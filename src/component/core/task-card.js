import React, { useEffect, useCallback, useMemo, useState } from 'react'

// Material ui 
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'

import BasicModal from '~pages/modal'

import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom'

const TaskCard = ({ data }) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card sx={{ minWidth: '280px', minHeight: '180px' }}>
            <CardContent>
                {
                    open === true
                        ?
                        <BasicModal
                            open={open}
                            setOpen={setOpen}
                            taskId={data.taskId}
                        />
                        :
                        <>
                        </>
                }
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Chip sx={{ marginRight: 'auto', borderRadius: '5px', mb: 1.5 }} color="secondary" label={data.taskTags} size="small" />
                    <Button sx={{ marginLeft: 'auto' }} onClick={handleOpen}> SHOW </Button>
                </Box>
                <Typography noWrap={true} >
                    {data.taskTitle}
                </Typography>
                <Typography variant='body2' gutterBottom color="text.secondary" maxWidth={230}
                    sx={{
                        wordWrap: 'break-word',
                    }}>
                    {data.taskContent}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Avatar src={data.memberInfo.memberAvatarUrl} alt={data.memberInfo.memberName} sx={{ width: 25, height: 25 }}

                    />
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} mr={1}>
                            {theme.palette.mode === 'dark' ? (
                                <img width='12px' height='12px' src="/card/black-clip.svg" />
                            ) : (
                                <img width='12px' height='12px' src="/card/white-clip.svg" />
                            )}
                            <Typography ml={0.5} variant='body2' color='text.secondary'>{data.commentCount}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            {theme.palette.mode === 'dark' ? (
                                <img width='12px' height='12px' src="/card/black-chat-text.svg" />
                            ) : (
                                <img width='12px' height='12px' src="/card/white-chat-text.svg" />
                            )}
                            <Typography ml={0.5} variant='body2' color='text.secondary' >{data.fileCount}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    )
};

export default TaskCard;