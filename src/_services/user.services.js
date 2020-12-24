import config from 'config';
import axios from 'axios';

export const userService = {
  getAll,
};

function getAll(query = {}) {
  return axios.get(`${config.apiUrl}/users`,)
    .then(result => {
      return result.data;
    });
}

