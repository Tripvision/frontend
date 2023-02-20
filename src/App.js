import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';


// Material ui 
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


// slice


// pages
import Header from '~pages/header'
import { NavTab } from '~pages/nav-tab'
import StateBar from '~pages/state-bar';
import Project from '~pages/project';
import Members from '~pages/projects/members';
import NotFound from '~pages/not-found';
import MyProjectActivity from '~pages/my-projects/my-project-activity';
import MyProjectBudget from '~pages/my-projects/my-project-budget';
import MyProjectFiles from '~pages/my-projects/my-project-files';
import MyProjectSettings from '~pages/my-projects/my-project-settings';
import MyProjectTarget from '~pages/my-projects/my-project-target';
import MyProjectUsers from '~pages/my-projects/my-project-users';
import ProjectsOverView from '~pages/my-projects/projects-over-view';
import MyProjectOverView from '~pages/my-projects/my-project-overView';
import LoginScreen from '~pages/login-screen';


import MyMemberTask from '~pages/members/my-member-tasks';

// component
import MuiSpeedDial from '~component/dashboard/mui-speed-dial';
import PrivateRoute from '~component/route/private-route';
import OAuth2RedirectHandler from '~component/route/oauth2-redirect-handler';
import VisualTab from '~component/core/visual-tab';
import MyTotalTasks from '~pages/my-projects/my-total-tasks';
import MyConnectMembers from '~pages/my-projects/my-connect-members';
import MyProfile from '~pages/my-projects/my-profile';
import MyAccount from '~pages/my-projects/my-account';


const App = () => {

  const user = useSelector(state => state.auth);
  const left = useSelector(state => state.layout.left);
  const center = useSelector(state => state.layout.center);
  const right = useSelector(state => state.layout.right);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.userInfo) {
      
    }
    else {

    }
  }, [user.userInfo, dispatch]);


  return (
    <BrowserRouter>
      <Box
        display={{
          xs: 'block', sm: 'block', md: "block", lg: 'none', xl: 'none',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
      >
        <MuiSpeedDial />
      </Box>
      <Grid
        container
        direction="row"
        sx={{ flexWrap: 'nowrap' }}
      >
        <Grid container item
          display={{ xs: 'none', sm: 'none', md: "none", lg:`${left.display}`, xl:`${left.display}`}}
          xs={0}
          sm={0}
          md={2}
          lg={Number(left.size)}
          xl={Number(left.size)}
          sx={{
            p: 0
          }}
        >
          <NavTab />
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        {/* Speed Dial condition */}
        <Grid item xs={12} sm={12} md={12} lg={Number(center.size)} xl={Number(center.size)}>
          <Header />
          <Divider orientation="vertical" flexItem></Divider>
          {/* Routing Line */}
          <Container mt={3}>
            <Routes>
              <Route path='/' element={<MyProfile/>} />
              <Route path='/my' element={<MyProfile/>} />
              <Route path='/my/profile' element={<MyProfile/>} />
              <Route path='/my/account' element={<MyAccount/>} />
              {/* 조건에 맞게 렌더링 시켜줄 조건  */}
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<LoginScreen />} />

              {/* <Route element={<PrivateRoute />}>
              // 해당 경로에 라우팅 패스 작성해주기
              </Route> */}

              <Route path='/projects/dash-board' element={<Project />} />
              <Route path='/total/tasks' element={<MyTotalTasks />} />
              <Route path='/connect-memers' element={<MyConnectMembers />} />
              <Route path='/productivity' element={<MyProjectActivity />} />
              

              <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}></Route>
              {/* <Route path="/projects/dash-board" element={<Project />}></Route> */}


              {/* 전체 프로젝트 오버뷰 */}
              <Route path="/projects" element={<ProjectsOverView />} />
              {/* 전체 프로젝트 오버뷰 */}
              <Route path="/projects/overview" element={<ProjectsOverView />} />

              {/* 나의 전체 태스크 오버뷰 */}
              <Route path="/tasks" element={<MyMemberTask />} />

              {/* 프로젝트 단건 한눈에보기 (조회)  OK */}
              <Route path='/projects/:id/' element={<VisualTab />}>
                <Route path="" element={<MyProjectOverView />} />
                {/* 프로젝/projects/:id 태스크별로 보기 (My Project-Targets) OK  */}
                <Route path="overview" element={<MyProjectOverView />} />
                {/* 프로젝/projects/:id 태스크별로 보기 (My Project-Targets) OK  */}
                <Route path="tasks" element={<MyProjectTarget />} />
                {/* 프로젝/projects/:id 예산 조회 (My Project-Budget) OK  */}
                <Route path="budgets" element={<MyProjectBudget />} />
                {/* 프로젝/projects/:id 멤버 조회 (My Project-members) OK */}
                <Route path="members" element={<MyProjectUsers />} />
                {/* 프로젝/projects/:id 파일 조회 (My Project-files) OK */}
                <Route path="files" element={<MyProjectFiles />} />
                {/* 프로젝/projects/:id 활동 조회 (My Project-Activity) OK */}
                <Route path="activities" element={<MyProjectActivity />} />
                {/* 프로젝/projects/:id 세팅 조회 (My Project-Settings) OK */}
                <Route path="settings" element={<MyProjectSettings />} />
              </Route>

              {/* 프로젝트 생성하기  (My Project-create) OK */}
              <Route path="projects/new" element={<MyProjectSettings />} />
              {/* 전체 조회  */}
              <Route path="/projects/members" element={<Members />}></Route>
              {/* 단건 조회  */}
              <Route path="/projects/members/:id" element={<Members />}></Route>
              {/* 에러 페이지  */}
              {<Route path="*" element={<NotFound />}></Route>}
            </Routes>
          </Container>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid container item
          display={{ xs: 'none', sm: 'none', md: "none", lg:`${right.display}`, xl:`${right.display}` }}
          xs={0}
          sm={0}
          md={0}
          lg={Number(right.size)}
          xl={Number(right.size)}
          sx={{
            p: 0
          }}
        >
          <StateBar />
        </Grid>
      </Grid> 
    </BrowserRouter >
  )
}

export default App

