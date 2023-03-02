import axios from "axios";
import { addAuthHeader as authHeader } from "~services/auth-service";
import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js'

const getMyTopBudget = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/budgets/top', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

// get
const getProjectBudget = (id) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/v1/projects/' + id + '/budgets', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

// update
const updateProjectBudget = (request) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.put(API_BASE_URL + '/v1/projects/' + request.id + '/budgets', request.budget, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};


// delete
const deleteProjectBudget = (projectId) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.delete(API_BASE_URL + "/v1/projects/" + projectId + "/budget", {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

const budgetService = {
  getProjectBudget,
  updateProjectBudget,
  deleteProjectBudget,
  getMyTopBudget
};

export default budgetService