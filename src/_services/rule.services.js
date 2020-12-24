import config from 'config';
import axios from 'axios';

export const ruleService = {
  getAll,
  addOne,
  editOne
};

function addOne(newRule = {}) {
  return axios.post(`${config.backendApi}/rule`,{newRule})
    .then(result => {
      return result.data || {};
    });
}
function editOne(_id, rule = {}) {
  return axios.put(`${config.backendApi}/rule/${_id}`,{rule})
    .then(result => {
      return result.data || {};
    });
}

function getAll(query = {}, pagination) {
  return axios.get(`${config.backendApi}/rule`,
    {
      params: {
        q: {...query},
        ...pagination
      }
    })
    .then(result => {
      return result.data;
    });
}

