import axios from "axios";

import { API_BASE_URL } from "~constants/index.js";
import { GOOGLE_AUTH_URL, ACCESS_TOKEN } from "~constants/index.js";
import { getAccessToken, setAccessToken } from "~utils/local-storage";

export function addAuthHeader() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return headers;
}

export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

  // 요청한 라우터 서치값
  const results = regex.exec(this.props.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const login = () => {
  return axios.get(GOOGLE_AUTH_URL).then((response) => {
    if (response.data.accessToken) {
      const token = this.getUrlParameter("token");
      setAccessToken(token);
    }
    return response.data;
  });
};

const myProfile = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(API_BASE_URL + "/v1/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const updateProfile = (member) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.put(API_BASE_URL + "/v1/members", member, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const authService = {
  addAuthHeader,
  getUrlParameter,
  login,
  logout,
  myProfile,
  updateProfile,
};

export default authService;
