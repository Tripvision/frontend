import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

// Material ui 
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ListItemAvatar } from '@mui/material';
import { Login, Logout } from '@mui/icons-material';

// login Async
import { logout } from '~features/auth/auth-slice'


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
                        !user.userInfo
                            ?
                            <ListItemText primary="You're not logged in" />
                            :
                            
                            <ListItemAvatar>
                                <Avatar alt="Not Found" src={user.userInfo.picture} />
                            </ListItemAvatar>
                            
                    }
                    {open ? <ExpandLess /> : <ExpandMore />}    
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            !user.userInfo
                                ? <ListItemButton component={Link} to="/login">
                                        <ListItemAvatar> <Logout/> </ListItemAvatar>    
                                        <ListItemText primary="login" />
                                    </ListItemButton>
                                : <ListItemButton onClick={() => { dispatch(logout()) }} sx={{ pl: 4 }}> 
                                    <ListItemAvatar>
                                        <Login />
                                    </ListItemAvatar>
                                    <ListItemText primary="logout" />
                                </ListItemButton>
                        }
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default ProfileBar;