import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { useDispatch } from "react-redux";
import { addPath, removePath } from "~features/route/route-slice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { palette } from "@mui/system";

const RouteBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Box className="breadcrumbs" sx={{ display: "flex", alignItems: "center" }}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <Box className="bc" key={match.pathname}>
          <Box component={Link} to={match.pathname || ""}>
            {breadcrumb && (
              <Typography sx={{ mr: 1 }} color="textPrimary">
                {breadcrumb} {index < breadcrumbs.length - 1 && " > "}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RouteBreadcrumbs;
