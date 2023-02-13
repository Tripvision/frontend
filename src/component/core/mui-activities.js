import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

// Material ui 
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// Redux State
import { userActivityList } from '~features/activity/user-activities-slice';

// Refactor : 활동기록을 가져올 때 문제가 생긴 부분에 대한 에러 핸들링
const MuiActivities = () => {

    // 상위 5개 까지만 렌더링 하세요.
    // const activities = useSelector(state => state.project.entities.activities).slice(0, 5);

    const activities = useSelector(userActivityList);

    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    return (
        <div>
            {
                activities === true ? <List>
                    <Typography variant='h3'>Activities</Typography>
                    {
                        // 상위 5개 까지만 렌더링 하세요.  
                        activities.map(item => (
                            <ListItemButton
                                key={item.id}
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={item.userImageUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        maxWidth: '300px',
                                    }}
                                    primaryTypographyProps={{ style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                    secondaryTypographyProps={{
                                        style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
                                    }}
                                    primary={item.title}
                                    secondary={
                                        <React.Fragment>
                                            {item.time}
                                        </React.Fragment>
                                    }
                                />

                            </ListItemButton>
                        ))
                    }
                </List>
                : <Typography> 활동기록이 없습니다. </Typography>
            }

        </div>
    )
};

export default MuiActivities;