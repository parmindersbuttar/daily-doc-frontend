import axios from 'axios'

export const loginApi = (credentials) => {
  return axios.post('http://3.20.172.101:2017/public/login', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const validateApi = (token) => {
  return axios.post('http://3.20.172.101:2017/public/validate', { token })
    .then(res => res.data)
    .catch(err => err.response.data)
};