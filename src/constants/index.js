// basic
export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';


// Oauth2
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =  API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;


// SCOPE
export const and = '&';
export const START_SCOPE = 'scope=';
export const YOUTUBE_FORCE_SSL =
  'https://www.googleapis.com/auth/youtube.force-ssl+';
export const YOUTUBE_READONLY =
  'https://www.googleapis.com/auth/youtube.readonly+';
export const YOUTUBE_AUTH = 'https://www.googleapis.com/auth/youtube+';
export const YOUTUBE_PARTNER = 'https://www.googleapis.com/auth/youtubepartner';

//
export const GOOGLE_AUTH_URL_YOUTUBE_PLAYLISTS_SCOPE =
  GOOGLE_AUTH_URL +
  and +
  START_SCOPE +
  YOUTUBE_READONLY +
  YOUTUBE_FORCE_SSL +
  YOUTUBE_AUTH +
  YOUTUBE_PARTNER;

// get AccessToken
export const GETACCESSTOKEN = API_BASE_URL + '/auth/google/accessToken';

// get Youtube PlayLists
export const PLAYLISTS = API_BASE_URL + '/v1/youtube/playlists';




// Member


