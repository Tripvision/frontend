import { ACCESS_TOKEN } from '~constants/index.js';

export function getAccessToken(token) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    else {
      localStorage.getItem(ACCESS_TOKEN,token);
      return true;
    }
}

export function setAccessToken(token) {
  if(localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("Access Token is Already");
    }
  else {
    localStorage.setItem(ACCESS_TOKEN,token);
  }
}

// 샘플입니다.
export function getRefreshToken() {
  if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    else {
      localStorage.setItem(ACCESS_TOKEN);
    }
}