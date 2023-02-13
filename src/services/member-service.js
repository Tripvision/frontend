import axios from "axios";
import { authHeader } from "~services/auth-service";
import {API_BASE_URL } from '~constants/index.js'

const getMyTeams = () => {
  return axios.get(API_BASE_URL + '/members/me/teams', { headers: authHeader() });
};

const getMyTeamMembers = () => {
  return axios.get(API_BASE_URL + '/members/me/teams/members', { headers: authHeader() });
};

// get
const getMyProfile = () => {
  return axios.get(API_BASE_URL + "/members/me", { headers : authHeader() });
};




// update
const updateMyProfile = () => {
  let config = {
    headers: authHeader(),
    params: {
      id: projectId,
    },
  };
  return axios.put(API_BASE_URL + "/members/me", config);
};
// delete

const deleteMyProfile = () => {
  return axios.delete(API_BASE_URL + "/members/me", { headers: authHeader() });
};

const memberService = {
  getMyTeams,
  getMyTeamMembers,
  getMyProfile,

  updateMyProfile,
  deleteMyProfile,

  getMyContactsPosition
};

export default memberService;