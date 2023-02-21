import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

// Material ui 
import Box from '@mui/material/Box';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ListItemAvatar, Typography } from '@mui/material';
import { Login, Logout } from '@mui/icons-material';


// login Async
import { removeToken } from '~features/auth/auth-slice'


// OK
const ProfileBar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div>
            <List sx={{ pt: 0 }}>
                <ListItemButton onClick={handleClick}>
                    {
                        user.isLoggedIn === true
                            ?
                            <Box sx={{display : 'flex', alignItems : 'center'}}>
                                <ListItemAvatar>
                                    <Avatar alt="Not Found" src={user.userInfo.avatarUrl} />
                                </ListItemAvatar>
                                <Typography> {user.userInfo.email} </Typography>
                            </Box>
                            :

                            <ListItemText primary="로그인하세요." />

                    }
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            user.isLoggedIn === true
                                ? <ListItemButton onClick={() => { dispatch(removeToken()) }} sx={{ pl: 4 }}>
                                    <ListItemAvatar>
                                        <Login />
                                    </ListItemAvatar>
                                    <ListItemText primary="logout" />
                                </ListItemButton>
                                :

                                <ListItemButton component={Link} to="/login">
                                    <ListItemAvatar> <Logout /> </ListItemAvatar>
                                    <ListItemText primary="login" />
                                </ListItemButton>
                        }
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default ProfileBar;