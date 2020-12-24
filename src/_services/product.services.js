import config from 'config';
import axios from 'axios';

export const productService = {
  getAll,
  getOne,
  addOne,
  editOne
};

function getOne(_id) {
  return axios.get(`${config.backendApi}/product/${_id}`)
    .then(result => {
      return result.data.product;
    });
}

function addOne(newProduct = {}) {
  return axios.post(`${config.backendApi}/product`,{newProduct})
    .then(result => {
      return result.data || {};
    });
}
function editOne(_id, product = {}) {
  return axios.put(`${config.backendApi}/product/${_id}`,{product})
    .then(result => {
      return result.data || {};
    });
}

function getAll(query = {}, pagination) {
  return axios.get(`${config.backendApi}/product`,{
    params: {
      q: {...query},
        ...pagination
    }
  })
    .then(result => {
      return result.data;
    });
}

