import axios from 'axios';
import { addAuthHeader as authHeader } from '~services/auth-service';
import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js';

export const getProjectMembers = id => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/projects/' + id + "/members", {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const updateProjectMember = (projectId, member) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  console.log(member);
  return axios.put(API_BASE_URL + '/v1/projects/' + projectId + "/projectmembers/" + member.memberId, member ,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const deleteProjectMember = (projectId, memberId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.delete(API_BASE_URL + '/v1/projects/' + projectId + "/members/" + memberId, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const inviteProjectMember = (projectId, mergeAuthority) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.post(API_BASE_URL + '/v1/projects/' + projectId + "/members", mergeAuthority  , {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

// 애는 리듀서에 올리지 말고 바로 요청할 것.
export const searchMemberByEmail = (memberEmail) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/members/' + memberEmail , {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const getAllMyTeamsCount = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/teams/count' , {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};





export const teamService = {
  getProjectMembers,
  deleteProjectMember,
  inviteProjectMember,
  updateProjectMember,
  searchMemberByEmail
};

export default teamService;
