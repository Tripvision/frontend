import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from '~constants/index.js';

const getMyContactsPosition = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return axios.get(API_BASE_URL + '/my/contacts/position', { headers: {
      'Authorization': `Bearer ${accessToken}`
    } });
};

const contactService = {
    getMyContactsPosition
}

export default contactService;