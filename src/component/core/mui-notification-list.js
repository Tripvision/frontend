import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Material ui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';


const prefix = '/icons/notifications/';
const typeList = ['social', 'bug', 'settings'];

// todo : useEffect 에서 받아온 값 useState 에 사용해도 괜찮은가?


// Refactor : props (title ) 받는 행위
// 계산은 Redux 에서 해서 뿌려주기만 하자.
// 프롭스 기반 계산을 해야할 경우 : https://itchallenger.tistory.com/573#recentComments 
const MuiNotificationList = () => {

    const notifier = useSelector(state => state.notifier.entities)
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState(1)
    const [notiList,setNotiList] = useState(null)
    
    
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    
    const addSrc = (notifier) => {
        const result = notifier.map(item => {
            const r = { ...item }
            typeList.map((type, idx) => {
                if (r.type === type) {
                    r.src = prefix + type + '.svg'
                }
            })
            return r;
        });
        setNotiList(result)
    }

    useEffect(() => {
        if(userInfo === null) {
        } else {
            addSrc(notifier)
        }
    }, [userInfo, notifier, dispatch])

    useEffect(() => {
        console.log(notiList)
    },[])

    return (
        <div>
            {
                notiList !== null ?
                <Box>
                <Typography variant='h3'>Notifications</Typography>
                <List>
                    {
                        notiList.map(item => {

                            return 
                            <ListItemButton
                                key={item.id}
                                alignItems="flex-start"
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={item.src} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        maxWidth: '300px',
                                    }}
                                    primary={item.title + item.src}
                                    primaryTypographyProps={{ style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                    secondaryTypographyProps={{
                                        style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
                                    }}
                                    secondary={
                                        <React.Fragment>
                                            {item.time}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>

                        })
                    }
                </List>
            </Box>
                : <div> 알림이 없습니다. </div>
            }
        </div>
    )
}

export default MuiNotificationList;


