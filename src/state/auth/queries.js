import axios from 'axios'
// http://3.20.172.101:2017
export const loginApi = (credentials) => {
  return axios.post('/public/login', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const registerApi = (credentials) => {
  return axios.post('/public/register', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const validateApi = (token) => {
  return axios.post('/public/validate', { token })
    .then(res => res.data)
    .catch(err => err.response.data)
};