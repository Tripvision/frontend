import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Material ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// slice

// pages
import Header from "~pages/header";
import { NavTab } from "~pages/nav-tab";
import StateBar from "~pages/state-bar";
import Project from "~pages/project";
import Members from "~pages/projects/members";
import NotFound from "~pages/not-found";
import MyProjectActivity from "~pages/my-projects/my-project-activity";
import MyProjectBudget from "~pages/my-projects/my-project-budget";
import MyProjectFiles from "~pages/my-projects/my-project-files";
import MyProjectSettings from "~pages/my-projects/my-project-settings";
import MyProjectTarget from "~pages/my-projects/my-project-target";
import MyProjectUsers from "~pages/my-projects/my-project-users";
import ProjectsOverView from "~pages/my-projects/projects-over-view";
import MyProjectOverView from "~pages/my-projects/my-project-overView";
import LoginScreen from "~pages/login-screen";

import MyMemberTask from "~pages/members/my-member-tasks";

// component
import MuiSpeedDial from "~component/dashboard/mui-speed-dial";
import PrivateRoute from "~component/route/private-route";
import OAuth2RedirectHandler from "~component/route/oauth2-redirect-handler";
import VisualTab from "~component/core/visual-tab";
import MyTotalTasks from "~pages/my-projects/my-total-tasks";
import MyConnectMembers from "~pages/my-projects/my-connect-members";
import MyProfile from "~pages/my-projects/my-profile";
import MyAccount from "~pages/my-projects/my-account";
import NewMyProjectSettings from "~pages/my-projects/new/new-my-project-setting";
import MyProductivity from "~pages/my-projects/my-productivity";
import MyTotalTaskCard from "~component/dashboard/counts/my-total-task-card";
import { ToastContainer } from "react-toastify";

const App = () => {
  const user = useSelector((state) => state.auth);
  const left = useSelector((state) => state.layout.left);
  const center = useSelector((state) => state.layout.center);
  const right = useSelector((state) => state.layout.right);

  return (
    <BrowserRouter>
      <ToastContainer />
      {/* <Box
        display={{
          xs: "block",
          sm: "block",
          md: "block",
          lg: "none",
          xl: "none",
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        <MuiSpeedDial />
      </Box> */}
      <Grid container direction="row" sx={{ flexWrap: "nowrap" }}>
        <Grid
          container
          item
          display={{
            xs: "none",
            sm: "none",
            md: "none",
            lg: `${left.display}`,
            xl: `${left.display}`,
          }}
          xs={0}
          sm={0}
          md={2}
          lg={Number(left.size)}
          xl={Number(left.size)}
          sx={{
            p: 0,
          }}
        >
          <NavTab />
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        {/* Speed Dial condition */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={Number(center.size)}
          xl={Number(center.size)}
        >
          <Header />
          <Divider orientation="vertical" flexItem></Divider>
          {/* Routing Line */}
          <Box mt={3} sx={{ ml: 3, mr: 3 }}>
            <Routes>
              <Route path="/" element={<Project />} />
              <Route path="/my" element={<MyProfile />} />
              <Route path="/my/profile" element={<MyProfile />} />
              <Route path="/my/account" element={<MyAccount />} />
              {/* 조건에 맞게 렌더링 시켜줄 조건  */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<LoginScreen />} />

              {/* <Route element={<PrivateRoute />}>
              // 해당 경로에 라우팅 패스 작성해주기
              </Route> */}

              <Route path="/projects/dash-board" element={<Project />} />

              <Route path="/total" element={<MyTotalTaskCard />} />
              <Route path="/total/tasks" element={<MyTotalTaskCard />} />

              <Route path="/connect-memers" element={<MyConnectMembers />} />
              <Route path="/productivity" element={<MyProductivity />} />

              <Route
                path="/oauth2/redirect"
                element={<OAuth2RedirectHandler />}
              ></Route>
              {/* <Route path="/projects/dash-board" element={<Project />}></Route> */}

              <Route path="/projects" element={<ProjectsOverView />} />
              <Route path="/projects/overview" element={<ProjectsOverView />} />

              <Route path="/tasks" element={<MyMemberTask />} />

              <Route path="/projects/:id/" element={<VisualTab />}>
                <Route path="" element={<MyProjectOverView />} />
                <Route path="overview" element={<MyProjectOverView />} />
                <Route path="tasks" element={<MyProjectTarget />} />
                <Route path="budgets" element={<MyProjectBudget />} />
                <Route path="members" element={<Members />} />
                <Route path="files" element={<MyProjectFiles />} />
                <Route path="activities" element={<MyProjectActivity />} />
                <Route path="settings" element={<MyProjectSettings />} />
              </Route>
              <Route path="projects/new" element={<NewMyProjectSettings />} />
              {<Route path="*" element={<NotFound />}></Route>}
            </Routes>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid
          container
          item
          display={{
            xs: "none",
            sm: "none",
            md: "none",
            lg: `${right.display}`,
            xl: `${right.display}`,
          }}
          xs={0}
          sm={0}
          md={0}
          lg={Number(right.size)}
          xl={Number(right.size)}
          sx={{
            p: 0,
          }}
        >
          <StateBar />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
};

export default App;
