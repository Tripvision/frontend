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
  return axios.get(API_BASE_URL + '/v1/projects/' + projectId + '/tasks/status' , {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const getTaskListByProjectId = (projectId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/projects/' + projectId + '/tasks', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const getTask = (id, taskId) => {
  return axios.get(API_BASE_URL + '/v1/projects/' + id + '/tasks/' + taskId, { headers: addAuthHeader() });
};


// post
export const createTask = (projectId, task) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.post(API_BASE_URL + '/v1/projects/' + projectId + "/tasks", task ,{
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${accessToken}`
    }
  })
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
  return axios.put(API_BASE_URL + '/v1/projects/' + projectId + '/tasks/' + taskId, config);
}

// delete
export const deleteTask = (projectId, taskId) => {
  return axios.delete(API_BASE_URL + '/v1/projects/' + projectId + '/tasks/' + taskId, { headers: addAuthHeader() });
}

// Task Count
export const getTaskCount = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/tasks/count', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

const taskService = {
  getTaskListByMemberId,
  getTaskListByProjectId,
  getTaskListStatus,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskCount,
};

export default taskService;
