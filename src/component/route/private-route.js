import React, { useEffect }  from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = () => {
    const { isLoggedIn }  = useSelector((state) => state.auth)

    if (!isLoggedIn) {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized :(</h1>
                <span>
                    <NavLink to='/login'>Login to gain access </NavLink>
                </span>
            </div>
        )
    }
    return <Outlet />;
};

export default PrivateRoute;