import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router';


function NavTabPanel(props) {
    const routePaths = useSelector(state => state.routes.entities);

    const { children, value, index, ...other } = props;

  
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
                {routePaths.map(path => (
                    path.path === "/"  ? 
                        <Box><Link to={`${path.path}`}>home</Link></Box>
                    :   <Box><Link to={`${path.path}`}>{path.path}</Link></Box>
                    
                ))}
            </Box>
          </Box>
        )}
      </div>
    );
}

export default NavTabPanel;