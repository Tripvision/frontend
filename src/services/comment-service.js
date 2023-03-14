import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "~constants/index.js";

const getCommentList = (id, taskId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.get(
    API_BASE_URL + "/v1/projects/" + id + "/tasks/" + taskId + "/comments",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const postComment = (id, taskId, comment) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.post(
    API_BASE_URL + "/v1/projects/" + id + "/tasks/" + taskId + "/comments",
    comment,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const updateComment = (projectId, taskId, commentId, comment) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.put(
    API_BASE_URL +
      "/v1/projects/" +
      projectId +
      "/tasks/" +
      taskId +
      "/comments/" +
      commentId,
    comment,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const deleteComment = (projectId, taskId, commentId, comment) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.delete(
    API_BASE_URL +
      "/v1/projects/" +
      projectId +
      "/tasks/" +
      taskId +
      "/comments/" +
      commentId,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const commentService = {
  getCommentList,
  postComment,
  updateComment,
  deleteComment,
};

export default commentService;
