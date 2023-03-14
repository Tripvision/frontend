import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";

// Material ui
import { useTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { addPath, removePath } from "~features/route/route-slice";

// component
import { ColorModeContext } from "~app/toggle-color-mode";
import RouteBreadcrumbs from "~component/core/route-breadcrumbs";

// features
import { left, right } from "~features/layout/layout-slice";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();

  // 이전 페이지 구현
  const navigate = useNavigate();
  const handlePrevRoute = () => {
    navigate(-1);
  };

  const handleRightBar = () => {
    dispatch(right());
  };

  const handleleftBar = () => {
    dispatch(left());
  };

  //
  const location = useLocation();

  const handleFavorites = (_) => {
    const path = {
      path: location.pathname,
      key: location.key,
    };
    dispatch(addPath(path));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="Header">
      <Box>
        <Box component="div" sx={{ flexGrow: 1 }}>
          <AppBar color="background" position="static">
            {/* 클릭 시 왼쪽 바 hide and on  */}
            <Toolbar sx={{ backgroundImage: "none" }}>
              <IconButton
                onClick={handleleftBar}
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                {theme.palette.mode === "dark" ? (
                  <img
                    width="24px"
                    alt=""
                    height="24px"
                    src="/header/Sidebar.svg"
                  />
                ) : (
                  <img
                    width="24px"
                    alt=""
                    height="24px"
                    src="/header/light-mode/Sidebar.svg"
                  />
                )}
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleFavorites}
                sx={{ mr: 2 }}
              >
                {theme.palette.mode === "dark" ? (
                  <img
                    width="24px"
                    alt=""
                    height="24px"
                    src="/header/Star.svg"
                  />
                ) : (
                  <img
                    width="24px"
                    alt=""
                    height="24px"
                    src="/header/light-mode/Star.svg"
                  />
                )}
              </IconButton>

              {/* 브래드크럼프  */}
              <RouteBreadcrumbs />

              <Box sx={{ marginLeft: "auto", display: "flex" }}>
                {/* <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search> */}

                {/* 이 부분 다크모드 렌더링 다 해야합니다. */}
                <Box
                  sx={{
                    display: { xs: "none", md: "flex", marginLeft: "auto" },
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={colorMode.toggleColorMode}
                  >
                    <Badge color="error">
                      {theme.palette.mode === "dark" ? (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/Sun.svg"
                        />
                      ) : (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/light-mode/Sun.svg"
                        />
                      )}
                    </Badge>
                  </IconButton>

                  {/* Prev Icon */}
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={handlePrevRoute}
                  >
                    <Badge badgeContent={4} color="error">
                      {theme.palette.mode === "dark" ? (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/ClockCounterClockwise.svg"
                        />
                      ) : (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/light-mode/ClockCounterClockwise.svg"
                        />
                      )}
                    </Badge>
                  </IconButton>

                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      {theme.palette.mode === "dark" ? (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/bell.svg"
                        />
                      ) : (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/light-mode/bell.svg"
                        />
                      )}
                    </Badge>
                  </IconButton>

                  <IconButton
                    onClick={handleRightBar}
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge color="error">
                      {theme.palette.mode === "dark" ? (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/Sidebar.svg"
                        />
                      ) : (
                        <img
                          width="24px"
                          alt=""
                          height="24px"
                          src="/header/light-mode/Sidebar.svg"
                        />
                      )}
                    </Badge>
                  </IconButton>

                  {/* <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton> */}
                </Box>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          {/* 이 부분은 나중에 따로 작성할 것 */}
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </Box>
    </div>
  );
};

export default Header;
