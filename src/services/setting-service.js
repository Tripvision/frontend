import axios from 'axios';

import { API_BASE_URL, ACCESS_TOKEN  } from '~constants/index.js';
import { addAuthHeader } from '~services/auth-service';

// get 
export const getProjectSetting = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects/' + id + '/setting' ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

// post
export const createSetting = (setting) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  const {id , state} = setting; 
  return axios.post(API_BASE_URL + '/projects/' + id + '/setting', state ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}


// put
export const updateSetting = (setting) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  const {id , state} = setting;
  return axios.put(API_BASE_URL + '/projects/' + id + '/setting/' + state.id , state ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

// delete
export const deleteSetting = (id,data) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.put(API_BASE_URL + '/projects/' + id + '/setting/' + data.id ,{
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
