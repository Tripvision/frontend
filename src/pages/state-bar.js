import React from 'react';

// Material ui
import { Container } from '@mui/material';

// Component 
import MuiNotificationList from '~component/core/mui-notification-list';
import MuiAvatarList from '~component/core/mui-avatar-list';
import MuiActivities from '~component/core/mui-activities';


const StateBar = () => {


    return (
        
        <Container sx={{pt: 3 }} >
            <MuiNotificationList />
            <MuiActivities />
            <MuiAvatarList />
        </Container>
    );
};

export default StateBar;