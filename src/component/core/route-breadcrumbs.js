import React, { useEffect } from "react";
import { Link, useNavigate, useLocation   } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";


import { useDispatch } from 'react-redux'
import { addPath, removePath } from "~features/route/route-slice";
import Box from '@mui/material/Box';


const RouteBreadcrumbs = () => {
  
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
  })


  return (
    <Box className="breadcrumbs" sx={{ display : 'flex', alignItems : 'center'}}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <div className="bc" key={match.pathname}>
          <Link to={match.pathname || ""}>{breadcrumb}</Link>
          {index < breadcrumbs.length - 1 && " >" + " "}
        </div>
      ))}
    </Box>
  );
};

export default RouteBreadcrumbs;


/*
const location = useLocation();
  // 필요없을 수도 있습니다.
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    
  );
<Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        <Typography variant='body1' color="text.primary">Home</Typography>
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>


*/
