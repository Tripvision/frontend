import axios from "axios";
import { addAuthHeader as authHeader } from "~services/auth-service";
import { ACCESS_TOKEN, API_BASE_URL } from "~constants/index.js";
// get
const getProjectFileList = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/" + id + "/files", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// get
const getProjectFile = (id, fileId) => {
  return axios.get(API_BASE_URL + "/projects/" + id + "/files/" + fileId, {
    headers: authHeader(),
  });
};

const createProjectFile = (id, taskId, formData) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.post(
    API_BASE_URL + "/v1/projects/" + id + "/tasks/" + taskId + "/files",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

// delete

const deleteProjectFile = (projectId, taskId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.delete(
    API_BASE_URL + "/v1/projects/" + projectId + "/tasks/" + taskId + "/files",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const fileService = {
  getProjectFileList,
  getProjectFile,
  createProjectFile,
  deleteProjectFile,
};

export default fileService;
