import axios from 'axios';
import { addAuthHeader } from '~services/auth-service';
import { API_BASE_URL } from '~constants/index.js';


const getTeamActiveList = id => {
  return axios.get(API_BASE_URL + '/projects/team/' + id, {
    headers: addAuthHeader(),
  });
};

const getTeamActive = id => {
  return axios.get(API_BASE_URL + '/projects/team/' + id + '/setting');
};

// post
const createTeamActive = ( {teamActive}) => {
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

const updateTeamActive = ( {teamActive} ) => {
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
const deleteTeamActive = (id) => {
  return axios.delete(API_BASE_URL + '/projects/' + id + "/teams", { headers: addAuthHeader() });
};


const teamActiveService = {
    getTeamActiveList,
    getTeamActive,
    createTeamActive,
    updateTeamActive,
    deleteTeamActive,
};

export default teamActiveService;
