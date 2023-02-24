import React, { useState } from 'react';

// Material ui
import { useTheme } from '@mui/material/styles';

import { useDispatch } from 'react-redux';


import NewSettingForm from './new-setting-form';


const NewMyProjectSettings = () => {

    return (
        <div>
            <NewSettingForm/>
        </div>
    );
};

export default NewMyProjectSettings;