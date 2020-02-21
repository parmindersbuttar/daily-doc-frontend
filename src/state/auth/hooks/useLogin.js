import { useState } from 'react';
import { 
  loginApi, 
  registerApi, 
  recoverPasswordApi, 
  validateApi,
  resetPasswordApi,
  updateApi
} from '../queries';
import { useStateValue } from '../../index';
import history from '../../../utils/history';
import {
  loginSuccess,
  loginFailed,
  recoverPasswordFailed,
  recoverPasswordSuccess,
  resetPasswordFailed,
  resetPasswordSuccess
} from '../actions'

const useProducts = () => {
  const [{auth}, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, sentEmailSent] = useState(false);
  
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
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('loginUser: ', err)
    }
  }

  const recoverPassword = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await recoverPasswordApi(credentials);
      setIsLoading(false);
      if (resp.msg) {
        dispatch(recoverPasswordFailed(resp.msg));
      } else {
        sentEmailSent(true);
        dispatch(recoverPasswordSuccess());
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(recoverPasswordFailed('Something went wrong. Please try after some time'));
      console.log('recoverPassword: ', err)
    }
  }

  const resetPassword = async (credentials) => {
    try {
      setIsLoading(true);
      const resp = await resetPasswordApi(credentials);
      setIsLoading(false);
      if (resp.msg) {
        dispatch(resetPasswordFailed(resp.msg));
      } else {
        sentEmailSent(true);
        dispatch(resetPasswordSuccess());
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(resetPasswordFailed('Something went wrong. Please try after some time'));
      console.log('resetPassword: ', err)
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
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
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
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('loginUser: ', err)
    }
  
  }

  const updateUser = async (credentials) => {
    if(!credentials.password.trim()) {
      delete credentials.password;
    }

    try {
      setIsLoading(true);
      const resp = await updateApi({...credentials});
      console.log(resp)
      setIsLoading(false);
      if (resp.msg) {
        dispatch(loginFailed(resp.msg));
      } else if(resp) {
        dispatch(loginSuccess(resp.user));
      }
    } catch (err) {
      setIsLoading(false);
      dispatch(loginFailed('Something went wrong. Please try after some time'));
      console.log('updateUser: ', err)
    }
  }

  return { auth, loginUser, validateUser, recoverPassword, resetPassword, registerUser, updateUser, isLoading, emailSent };
}

export default useProducts
