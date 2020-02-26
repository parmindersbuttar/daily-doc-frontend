import axios from 'axios'

export const getPlansApi = (credentials) => {
  return axios.get('http://3.20.172.101:2018/public/plans')
    .then(res => res.data)
    .catch(err => err.response.data)
};
