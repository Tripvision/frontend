import axios from 'axios';

import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js';
import { addAuthHeader } from '~services/auth-service';


export const getMyCurrentProject = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects/cuurent', { headers: {
    'Authorization': `Bearer ${accessToken}`
  } });
};

export const getMyProjectFinanceTotal = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/finances/total', { headers: {
    'Authorization': `Bearer ${accessToken}`
  } });
};

export const getMyProjectOurClient = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/clients', { headers: {
    'Authorization': `Bearer ${accessToken}`
  } });
};

export const getMyProjectsStatus = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects/status', { headers: {
    'Authorization': `Bearer ${accessToken}`
  } });
};




export const getMyProjects = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects', { headers: {
    'Authorization': `Bearer ${accessToken}`
  } });
};

// 기본 프로젝트 데이터 바인딩



export const getMyProject = (id) => {
  return axios.get(API_BASE_URL + '/projects/' + id, { headers: addAuthHeader() });
};



export const getMyCompleteProject = () => {
  return axios.get(API_BASE_URL + '/projects/complete', { headers: addAuthHeader() });
};




// post
export const createProject = (projectId) => {
  let config = {
    headers: addAuthHeader(),
    params: {
      id: projectId,
    },
  };
  return axios.get(API_BASE_URL + '/projects', config);
}


// put
export const updateProject = (id) => {
  let config = {
    headers: addAuthHeader(),
    params: {
      id: id,
    },
  };
  return axios.put(API_BASE_URL + '/projects/' + id, config );
}

// delete
export const deleteAllProject = () => {
  return axios.delete(API_BASE_URL + '/projects', { headers: addAuthHeader() });
}

export const deleteProject = (projectId) => {
  return axios.delete(API_BASE_URL + '/projects/' + projectId, { headers: addAuthHeader() });
}

export const projectService = {
  getMyProjects,
  getMyProject,
  getMyCurrentProject,
  getMyCompleteProject,
  getMyProjectFinanceTotal,
  getMyProjectsStatus,

  createProject,

  updateProject,
  deleteProject,
  deleteAllProject,
};

export default projectService;
