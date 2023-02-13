import axios from 'axios';
import { addAuthHeader } from '~services/auth-service';
import { API_BASE_URL } from '~constants/index.js';


export const getUserActiveList = id => {
  return axios.get(API_BASE_URL + '/users/activies' + id, {
    headers: addAuthHeader(),
  });
};

export const getUserActive = id => {
  return axios.get(API_BASE_URL + '/users/activies' + id);
};

// post
const createUserActive = ( {teamActive}) => {
  let {title} = teamActive;
  let config = {
    headers: addAuthHeader(),
    params: {
      title: title,
    },
  };
  return axios.get(API_BASE_URL + '/projects/team', config);
};


// put

const updateUserActive = ( {teamActive} ) => {
  let { teamActiveId } = teamActive;
  let config = {
    headers: addAuthHeader(),
    params: {
      id: teamActiveId,
    },
  };
  return axios.put(API_BASE_URL + '/projects/activies/' + teamActiveId , config);
};


// delete
const deleteUserActive = (id) => {
  return axios.delete(API_BASE_URL + '/projects/' + id + "/teams", { headers: addAuthHeader() });
};


const userActiveService = {
    getUserActiveList,
    getUserActive,
    createUserActive,
    updateUserActive,
    deleteUserActive,
};

export default userActiveService;
