import React, { useState, useEffect, } from 'react';

// Material ui 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { isEmptyObj } from '../../utils/object-utils';

const OverViewCard = ({ data }) => {

    useEffect(() => {
        console.log(data);
        
    });

    return (
        <>
            {
                isEmptyObj(data) === true ? null
                    :
                    <Card sx={{ mb: 3, borderRadius: '15px' }} >
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography>{data.projectOverViewHeadDto.projectName}</Typography>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', flex: 1 }}>
                                        <Box>
                                            <Typography>Status</Typography>
                                            <Typography>{data.projectOverViewHeadDto.status} / {data.projectOverViewHeadDto.taskPercent}</Typography>
                                        </Box>
                                        <Divider orientation="vertical" variant="middle" flexItem />

                                        <Box>
                                            <Typography>Total Tasks</Typography>
                                            <Typography>{data.projectOverViewHeadDto.completedTaskSize} / {data.projectOverViewHeadDto.totalTaskSize}</Typography>
                                        </Box>
                                        <Divider orientation="vertical" variant="middle" flexItem />
                                        <Box>
                                            <Typography>Due Date</Typography>
                                            <Typography>{data.projectOverViewHeadDto.dueDate}</Typography>
                                        </Box>
                                        <Divider orientation="vertical" variant="middle" flexItem />
                                        <Box>
                                            <Typography>Budget Spent</Typography>
                                            <Typography>{data.projectOverViewHeadDto.budgetSpent}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ marginLeft: 'auto' }}>
                                        <Avatar src="" alt="d" sx={{ marginLeft: 'auto', width: 42, height: 42 }} />
                                        <AvatarGroup max={4}
                                            sx={{
                                                '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 15 },
                                            }}
                                        >
                                            {
                                                data.memberList.map(member => (
                                                    <>
                                                        <Avatar alt={member.name} src={member.avatarUrl} sx={{ width: "20px", height: "20px" }} />
                                                    </>
                                                ))
                                            }

                                        </AvatarGroup>
                                    </Box>
                                </Box>

                            </Box>
                        </CardContent>
                    </Card>
            }

        </>
    )
}

export default OverViewCard;