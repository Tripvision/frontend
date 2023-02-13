import axios from "axios";
import { addAuthHeader as authHeader } from "~services/auth-service";
import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js'

const getMyTopBudget = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  return axios.get(API_BASE_URL + '/budgets/top', { headers: {
    'Authorization': `Bearer ${accessToken}`
  } });
};

// get
const getProjectBudget = (id) => {
  return axios.get(API_BASE_URL + "/projects/" + id + "/budget", { headers : authHeader() });
};

// post
const createProjectBudget = (id, {budget}) => {
  let { title, type } = budget; 
  let config = {
    headers: authHeader(),
    params: {
      title: title,
      type : type
    },
  };
  return axios.put(API_BASE_URL + "/projects/" + id + "/budget", config);
};


// update
const updateProjectBudget = (projectId, {budget}) => {
  let {budgetId, type, title} = budget;
  let config = {
    headers: authHeader(),
    params: {
      id: budgetId,
      type : type,
      title : title,
    },
  };
  return axios.put(API_BASE_URL + "/projects/" + projectId + "/budget", config);
};
// delete

const deleteProjectBudget = (projectId) => {
  return axios.delete(API_BASE_URL + "/projects/" + projectId + "/budget" , { headers: authHeader() });
};

const budgetService = {
  getProjectBudget,
  createProjectBudget,
  updateProjectBudget,
  deleteProjectBudget,
  getMyTopBudget
};

export default budgetService