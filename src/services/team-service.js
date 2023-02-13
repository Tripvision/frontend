import axios from 'axios';
import { addAuthHeader as authHeader } from '~services/auth-service';
import { API_BASE_URL } from '~constants/index.js';


export const getProjectTeam = id => {
  return axios.get(API_BASE_URL + '/projects/team/' + id, {
    headers: authHeader(),
  });
};

export const getProjectTeamSetting = id => {
  return axios.get(API_BASE_URL + '/projects/team/' + id + '/setting');
};

export const getProjectTeamMembers = id => {
  return axios.get(API_BASE_URL + '/projects/team/' + id + '/members');
};

export const getProjectTeamMember = (teamId, memberId) => {
  return axios.get(
    API_BASE_URL + '/projects/team/' + teamId + '/members' + memberId
  );
};

// post
export const createTeam = ( {team} ) => {
  let { teamTitle } = team;
  let config = {
    headers: authHeader(),
    params: {
      title : teamTitle,
    },
  };
  return axios.get(API_BASE_URL + '/projects/team', config);
};

export const inviteTeamMember = (teamId, {member}) => {
  let { memberName } = member;
  let config = {
    headers: authHeader(),
    params: {
      name : memberName,
    },
  };
  return axios.get(
    API_BASE_URL + '/projects/teams/' + teamId + '/members',
    config
  );
};

// put

export const updateTeam = (projectId , { team } ) => {
  let {teamId} = team;
  let config = {
    headers: authHeader(),
    params: {
      id: teamId,
    },
  };
  return axios.put(API_BASE_URL + '/projects/' + projectId +"/teams", config);
};

export const updateTeamMember = (teamId, {member}) => {
  let {memberId} = member;
  let config = {
    headers: authHeader(),
    params: {
      id: memberId,
    },
  };
  return axios.put(API_BASE_URL + '/teams/' + teamId, + "/members" ,config);
};


// delete
export const deleteTeam = (id) => {
  return axios.delete(API_BASE_URL + '/projects/' + id + "/teams", { headers: authHeader() });
};

export const deleteTeamMember = (id) => {
  return axios.delete(API_BASE_URL + '/projects/' + id + "/teams/members", {
    headers: authHeader(),
  });
};

const teamService = {
  getProjectTeam,
  getProjectTeamSetting,
  getProjectTeamMembers,
  getProjectTeamMember,

  createTeam,
  inviteTeamMember,
  updateTeam,
  updateTeamMember,

  deleteTeam,
  deleteTeamMember,
};

export default teamService;
