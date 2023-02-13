import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
    return isLogin ? <Navigate to='/'/> : children;
};

export default PublicRoute;