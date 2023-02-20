import axios from 'axios';

import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js';
import { addAuthHeader } from '~services/auth-service';

export const getTaskListByMemberId = (memberId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects/' + memberId + '/tasks', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

// 태스크 상태별로 가져오기 
// My-project-target ( figma )
export const getTaskListStatus = (projectId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects/' + projectId + '/tasks/status' , {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const getTaskListByProjectId = (projectId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/projects/' + projectId + '/tasks', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const getTask = (id, taskId) => {
  return axios.get(API_BASE_URL + '/projects/' + id + '/tasks/' + taskId, { headers: addAuthHeader() });
};

export const createTask = (projectId, { task }) => {
  let { title } = task;
  let newTask = {
    headers: addAuthHeader(),
    params: {
      title: title,
    },
  };
  return axios.get(API_BASE_URL + '/projects/' + projectId + '/tasks', newTask);
}


// put
export const updateTask = (projectId, { task }) => {
  let { taskId } = task
  let config = {
    headers: addAuthHeader(),
    params: {
      id: taskId,
    },
  };
  return axios.put(API_BASE_URL + '/projects/' + projectId + '/tasks/' + taskId, config);
}

// delete
export const deleteTask = (projectId, taskId) => {
  return axios.delete(API_BASE_URL + '/projects/' + projectId + '/tasks/' + taskId, { headers: addAuthHeader() });
}

const taskService = {
  getTaskListByMemberId,
  getTaskListByProjectId,
  getTaskListStatus,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
