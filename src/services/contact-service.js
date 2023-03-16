import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "~constants/index.js";

const getConnectMembers = (projectId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/members", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const contactService = {
  getConnectMembers,
};

export default contactService;
