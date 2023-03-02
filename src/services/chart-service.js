import axios from "axios";
import { addAuthHeader as authHeader } from "~services/auth-service";
import { API_BASE_URL, ACCESS_TOKEN } from '~constants/index.js'

const getTaskgraph = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return axios.get(API_BASE_URL + '/taskgraph', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};
const getBudgetGraph = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return axios.get(API_BASE_URL + '/v1/budgetgraph', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};
const getProjectgraph = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return axios.get(API_BASE_URL + '/v1/projectgraph', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};
const getConnectgraph = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return axios.get(API_BASE_URL + '/v1/connectgraph', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};



const chartService = {
    getTaskgraph,
    getBudgetGraph,
    getProjectgraph,
    getConnectgraph
};

export default chartService