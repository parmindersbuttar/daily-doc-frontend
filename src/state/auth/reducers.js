import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "./actions";

export const INITIAL_STATE = {
  logged: false,
  error: null,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged: true,
        error: null
      }
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};