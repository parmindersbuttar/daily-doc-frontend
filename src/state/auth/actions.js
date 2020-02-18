export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'auth/CLEAR_USER';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});