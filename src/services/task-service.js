import axios from 'axios';

import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js';
import { addAuthHeader } from '~services/auth-service';

export const getTaskList = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/tasks',{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};


// // get Collection
// export const getTaskList = () => {
//   return axios.get(API_BASE_URL + '/tasks', { headers: addAuthHeader() });
// };


// get Document
export const getTask = (id, taskId) => {
  return axios.get(API_BASE_URL + '/projects/' + id + '/tasks/' + taskId, { headers: addAuthHeader() });
};


// post
export const createTask = (projectId, {task}) => {
  let {title} = task;
  let newTask = {
    headers: addAuthHeader(),
    params: {
      title: title,
    },
  };
  return axios.get(API_BASE_URL + '/projects/' + projectId + '/tasks', newTask);
}


// put
export const updateTask = (projectId, {task}) => {
  let { taskId } = task
  let config = {
    headers: addAuthHeader(),
    params: {
      id: taskId,
    },
  };
  return axios.put(API_BASE_URL + '/projects/' + projectId + '/tasks/' + taskId, config );
}

// delete
export const deleteTask = (projectId, taskId) => {
  return axios.delete(API_BASE_URL + '/projects/' + projectId + '/tasks/' + taskId , { headers: addAuthHeader() });
}

export const projectService = {
    getTaskList,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};

export default projectService;
