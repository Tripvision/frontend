import React from 'react';

// Material ui 
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon } from '@mui/material';

// react router
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router-dom';

// Refactor : props 전체를 받아오는 행위
// Refactor : router 부분은 Redux 에서 가져오도록 하자.
// 
const MuiListItemLink = (props) => {
  const { to, breadcrumbNameMap, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
      <ListItemButton sx={{ ml: 9, pl: 4 }} component={RouterLink} to={to} {...other}>
        <ListItemText sx={{
          textAlign: 'left'
        }}
          primary={primary} />
        {icon}
      </ListItemButton>
  );
};

export default MuiListItemLink;