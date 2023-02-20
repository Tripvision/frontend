import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom';

// Material ui 
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import UserSearch from './user-search';

// Component
import NewModal from '~component/my-project/new-modal';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export function BasicCard() {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [activateTab, setActivateTab] = useState(false);
    const label = ['Overview', 'Tasks', 'Budgets', 'Members', 'Files', 'Activities', 'Settings'];

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }

    setTimeout(() => {
        setActivateTab(true)
    }, 100)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        console.log(id);
    },[useParams]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft : '24px',
            }}
            mb={3}
        >
            <Tabs
                sx={{ marginRight: 'auto' }}
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                indicatorColor='secondary'
                textColor='secondary'
            >
                {
                    label.map((item, index) => (
                        <Tab key={index} label={label[index]}  {...a11yProps(index)}
                            onClick={() => { navigate(label[index].toLowerCase()) }}
                        />
                    ))
                }
            </Tabs>
            {/* 하이드 처리 해야합니다. */}
            <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                <Button onClick={handleOpen} variant='text'>
                    Add Task
                </Button>
                <UserSearch />
                <Button onClick={() => navigate('/projects/new')} variant='text'>
                    Add Project
                </Button>
                <NewModal
                    open={open} 
                    setOpen={setOpen}
                    sx={{display : 'none'}}
                />

            </Box>
        </Box>
    );
}

export default function VisualTab() {

    return (
        <div >
            <BasicCard />
            <Outlet />
        </div>
    );
}
