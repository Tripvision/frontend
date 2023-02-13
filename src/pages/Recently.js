import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export const Recently = (props) => {
    const [preves, setPreves] = useState([]);
    const { children, value, index, prev, ...other } = props;

    useEffect(() => {
        if(preves.length >= 4) {
            let temp = preves.concat(prev);
            temp.shift();
            setPreves(temp);
        }
        else {
            setPreves(preves.concat(prev));
        }
    }, [props.prev]);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>
                        {
                            preves.map(prev => (<Box sx={{ display: 'flex' }}> <Link to={`${prev}`}>{prev}</Link> </Box>))
                        }
                    </Box>
                </Box>
            )}
        </div>
    )
};

export default Recently;
