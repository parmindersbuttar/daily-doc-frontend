import axios from 'axios'

export const loginApi = (credentials) => {
  return axios.post('http://3.20.172.101:2017/public/login', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const registerApi = (credentials) => {
  return axios.post('http://3.20.172.101:2017/public/register', { ...credentials })
    .then(res => res.data)
    .catch(err => err.response.data)
};

export const updateApi = (credentials) => {
  return axios.put('http://3.20.172.101:2017/private/users', { ...credentials }, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => res.data)
    .catch(err => { throw(err.response.data) })
};

export const validateApi = (token) => {
  return axios.post('http://3.20.172.101:2017/public/validate', { token })
    .then(res => res.data)
    .catch(err => { throw(err.response.data) })
};

export const recoverPasswordApi = (credentials) => {
  return axios.post('http://3.20.172.101:2017/public/recover-password', { ...credentials })
    .then(res => res.data)
    .catch(err => { throw(err.response.data) })
};

export const resetPasswordApi = (credentials) => {
  return axios.post('http://3.20.172.101:2017/public/reset-password', { ...credentials })
    .then(res => res.data)
    .catch(err => { throw(err.response.data) })
};