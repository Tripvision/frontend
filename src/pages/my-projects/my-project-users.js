import React, { useEffect } from 'react';


import Members from '~pages/projects/members';

const MyProjectUsers = () => {
    
    useEffect(() => {
        console.log("Member Render")
    })
    return (
        <div>
            <Members />
        </div>
    );
};

export default MyProjectUsers;