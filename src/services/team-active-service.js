import axios from "axios";
import { addAuthHeader } from "~services/auth-service";
import { ACCESS_TOKEN, API_BASE_URL } from "~constants/index.js";

const getTeamActiveList = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/projects/" + id + "/activities", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteTeamActive = (projectId, activityId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.delete(
    API_BASE_URL + "/v1/projects/" + projectId + "/activities/" + activityId,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const teamActiveService = {
  getTeamActiveList,
  deleteTeamActive,
};

export default teamActiveService;
