import React from 'react';
import { useSelector, useDispatch } from "react-redux";


import { defaultActivities, defaultUsers } from '@features/project/project-slice';

// OK 
const MuiContacts = () => {
    const users = useSelector(defaultUsers);
    return (
        <div>
            
        </div>
    );
};

export default MuiContacts;