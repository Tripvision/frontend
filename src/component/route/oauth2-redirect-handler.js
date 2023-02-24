import React, { useEffect } from 'react';
import { Navigate , useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// constants
import { ACCESS_TOKEN } from '~constants/index';
import { setToken, removeToken, myProfile } from '~features/auth/auth-slice';
import { isEmptyObj } from '../../utils/object-utils';

const OAuth2RedirectHandler = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    const token = getUrlParameter('token');

    const userInfo = useSelector(state => state.auth.userInfo);

    useEffect(() => {
        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            dispatch(myProfile());
        } else {
            dispatch(removeToken());
        }
        
    },[dispatch, token]);

    return (
        <div>
            {
                isEmptyObj(userInfo) === true
                ? <Navigate to='/login' />
                : <Navigate to='/projects/dash-board' />
            }
        </div>
    );
};

export default OAuth2RedirectHandler;