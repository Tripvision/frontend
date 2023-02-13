import axios from "axios";
import { addAuthHeader as authHeader } from "~services/auth-service";
import { API_BASE_URL } from '~constants/index.js'

// get
const getProjectFileList = (id) => {
  return axios.get(API_BASE_URL + "/projects/" + id + "/files", { headers : authHeader() });
};

// get
const getProjectFile = (id, fileId) => {
    return axios.get(API_BASE_URL + "/projects/" + id + "/files/" + fileId, { headers : authHeader() });
};


// create
const createProjectFile = (projectId,  {files} ) => {
    let { fileName } = files;
    let config = {
      headers: authHeader(),
      params: {
        fileName: fileName,
      },
    };
    return axios.put(API_BASE_URL + "/projects/" + projectId + "/files", config);
  };

 
// update
const updateProjectFile = (projectId,  {files} ) => {
  let { fileName } = files;
  let config = {
    headers: authHeader(),
    params: {
      fileName: fileName,
    },
  };
  return axios.put(API_BASE_URL + "/projects/" + projectId + "/files", config);
};
// delete

const deleteProjectFile = (projectId, fileId) => {
  return axios.delete(API_BASE_URL + "/projects/" + projectId + "/files/" + fileId, { headers: authHeader() });
};

const fileService = {
    getProjectFileList,
    getProjectFile,
    createProjectFile,
    updateProjectFile,
    deleteProjectFile
};

export default fileService