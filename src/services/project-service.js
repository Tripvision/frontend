import axios from "axios";

import { API_BASE_URL, ACCESS_TOKEN } from "~constants/index.js";
import { addAuthHeader } from "~services/auth-service";

export const getMyCurrentProject = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/situation", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyProjectFinanceTotal = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/finances/total", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyProjectOurClient = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/clients", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyProjectsStatus = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/projects/status", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyProjectList = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyProductList = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/completed", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyProjectOverView = (projectId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/" + projectId + "/overview", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// project Count
export const getProjectCount = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/count", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// getProductivity
export const getProductivity = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/completed/percent", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// post
export const createProject = (projectId) => {
  let config = {
    headers: addAuthHeader(),
    params: {
      id: projectId,
    },
  };
  return axios.get(API_BASE_URL + "/projects", config);
};

// put
export const updateProject = (id) => {
  let config = {
    headers: addAuthHeader(),
    params: {
      id: id,
    },
  };
  return axios.put(API_BASE_URL + "/projects/" + id, config);
};

// delete
export const deleteAllProject = () => {
  return axios.delete(API_BASE_URL + "/projects", { headers: addAuthHeader() });
};

export const deleteProject = (projectId) => {
  return axios.delete(API_BASE_URL + "/projects/" + projectId, {
    headers: addAuthHeader(),
  });
};

const projectService = {
  getMyCurrentProject,
  getMyProjectFinanceTotal,
  getMyProjectsStatus,
};

export default projectService;
