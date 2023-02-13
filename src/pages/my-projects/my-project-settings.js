import React, { useState } from 'react';

// Material ui

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { SettingForm } from '~component/my-project/setting-form';


const MyProjectSettings = () => {

    const theme = useTheme();

    const [state, setState] = useState({
        gilad: true,
    });

    return (
        <div>
            <SettingForm/>
        </div>
    );
};

export default MyProjectSettings;