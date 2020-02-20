import { useState } from 'react';
import { loginApi, registerApi, validateApi } from '../queries';
import { useStateValue } from '../../index';
import history from '../../../utils/history';
import {
  loginSuccess,
  loginFailed
} from '../actions'

const useProducts = () => {
  const [{auth}, dispatch] = useStateValue()
  const [isLoading, setIsLoading] = useState(false)

  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await loginApi(credentials);
      setIsLoading(false);
      if (resp.msg) {
        dispatch(loginFailed(resp.msg));
      } else {
        localStorage.setItem('token', resp.token);
        dispatch(loginSuccess(resp.user));
        history.push('/');
      }
    } catch (err) {
      console.log('loginUser: ', err)
    }
  }

  const registerUser = async (credentials, card) => {
    console.log(credentials)
    try {
      setIsLoading(true);
      const resp = await registerApi({...credentials, card});
      setIsLoading(false);
      if (resp.msg) {
        dispatch(loginFailed(resp.msg));
      } else {
        localStorage.setItem('token', resp.token);
        dispatch(loginSuccess(resp.user));
        history.push('/');
      }
    } catch (err) {
      console.log('registerUser: ', err)
    }
  }

  const validateUser = async (token) => {
    try {
      setIsLoading(true);
      const resp = await validateApi(token);
      setIsLoading(false);
      if (resp.isvalid) {
        dispatch(loginSuccess(resp.user));
      } else {
        localStorage.clear();
        history.push('/sign-in');
      }
    } catch (err) {
      console.log('loginUser: ', err)
    }
  
  }

  return { auth, loginUser, validateUser, registerUser, isLoading };
}

export default useProducts
