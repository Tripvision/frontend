import React, { useState } from 'react'

// Material ui
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//component 
import NavTabPanel from './nav-tabs';
import MuiListItemLink from '~component/core/mui-list-Item-link';
import ProfileBar from '~component/core/profile-bar';
import { Recently } from './Recently';
import { usePrevRoute } from '../component/hooks/usePrevRoute';


const breadcrumbNameMap = {
    // DashBoard Routing
    '/projects/dash-board': 'Dash-board',
    '/projects/overview': 'Projects',
    // My Routing
    '/profile/me': 'Profile',
    '/account': 'Account',
};


export function NavTab() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [opens, setOpens] = useState([false, false, false, false, false]);
    const [dashOpens, setDashOpens] = useState([false, false, false, false]);

    const handleClick = (index) => {
        setOpens(opens => opens.map((item, idx) => idx === index ? !item : item))
    };
    const handleDashOpen = (index) => {
        setDashOpens(dashOpens => dashOpens.map((item, idx) => idx === index ? !item : item))
    }

    const prev = usePrevRoute();


    return (
        <Box sx={{ pt: 0.5 }}>
            <Box > <ProfileBar /> </Box>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                    <Tab label="Favorites" />
                    <Tab label="Recently" />
                </Tabs>
                <NavTabPanel value={value} index={0} />
                <Recently
                    value={value} index={1}
                    prev={prev}
                />
            </Box>

            {/* DashBoard Nav */}
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader"> My Pages </ListSubheader>
                }
            >
                <ListItemButton onClick={() => handleClick(0)}>
                    {opens[0] ? <ExpandLess /> : <ExpandMore />}
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="My" />
                </ListItemButton>
                <Collapse in={opens[0]} timeout="auto" unmountOnExit>
                    {/* 라우팅으로 체인지 표본  */}
                    <List component="div" disablePadding>
                        <MuiListItemLink breadcrumbNameMap={breadcrumbNameMap} to="/projects/dash-board" />
                    </List>

                    {/* 라우팅으로 체인지 표본  */}
                    <List component="div" disablePadding>
                        <MuiListItemLink breadcrumbNameMap={breadcrumbNameMap} to="/projects/overview" />
                    </List>

                    {/* 라우팅으로 체인지 표본  */}
                    <List component="div" disablePadding>
                        <MuiListItemLink breadcrumbNameMap={breadcrumbNameMap} to="/profile/me" />
                    </List>


                    {/* 라우팅으로 체인지 표본  */}
                    <List component="div" disablePadding>
                        <MuiListItemLink breadcrumbNameMap={breadcrumbNameMap} to="/account" />
                    </List>

                </Collapse>
            </List>


            {/* MyPages Nav */}
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader"> Pages </ListSubheader>
                }
            >
                <ListItemButton onClick={() => handleClick(1)}>
                    {opens[1] ? <ExpandLess /> : <ExpandMore />}
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="User Profile" />
                </ListItemButton>
                <Collapse in={opens[1]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ ml: 9, pl: 4 }}>
                            {/* <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon> */}
                            <ListItemText sx={{
                                textAlign: 'left'
                            }} primary="Overview" />
                        </ListItemButton>
                    </List>

                    <List component="div" disablePadding>
                        <ListItemButton sx={{ ml: 9, pl: 4 }}>
                            {/* <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon> */}
                            <ListItemText sx={{
                                textAlign: 'left'
                            }} primary="Projects" />
                        </ListItemButton>
                    </List>

                    <List component="div" disablePadding>
                        <ListItemButton sx={{ ml: 9, pl: 4 }}>
                            {/* <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon> */}
                            <ListItemText primary="Campaigns" />
                        </ListItemButton>
                    </List>

                    <List component="div" disablePadding>
                        <ListItemButton sx={{ ml: 9, pl: 4 }}>
                            {/* <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon> */}
                            <ListItemText sx={{
                                textAlign: 'left'
                            }} primary="Documents" />
                        </ListItemButton>
                    </List>

                    {/* 라우팅으로 체인지 표본  */}
                    <List component="div" disablePadding>
                        <MuiListItemLink breadcrumbNameMap={breadcrumbNameMap} to="/profile/followers" />
                    </List>

                </Collapse>
            </List>
        </Box>
    );

}
