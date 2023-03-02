import axios from 'axios';

import { API_BASE_URL, ACCESS_TOKEN  } from '~constants/index.js';

// get 
export const getProjectSetting = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/projects/' + id ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

// post
export const createSetting = (setting) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.post(API_BASE_URL + '/v1/projects', setting ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}


// put
export const updateSetting = (request) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  const {id , setting} = request;
  console.warn(id)
  return axios.put(API_BASE_URL + '/v1/projects/' + id , setting  ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

// delete
export const deleteSetting = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.delete(API_BASE_URL + '/v1/projects/' + id ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

export const projectService = {
  getProjectSetting,
  createSetting,
  updateSetting,
  deleteSetting,
};

export default projectService;
