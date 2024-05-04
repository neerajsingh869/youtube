import { LOAD_PROFILE, LOGIN_LOGOUT_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actions/authActions";

const INITIAL_STATE = {
  accessToken: sessionStorage.getItem('yt-access-token') ? sessionStorage.getItem('yt-access-token') : null,
  user: sessionStorage.getItem('yt-user') ? JSON.parse(sessionStorage.getItem('yt-user')): null,
  loading: false
}

export const authReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch(type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload,
        loading: false
      }
    case LOGIN_LOGOUT_FAIL:
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: payload
      }
    case LOAD_PROFILE:
      return {
        ...state,
        user: payload
      }
    case LOG_OUT:
      return {
        ...state,
        accessToken: null,
        user: null,
      }
    default:
      return state;
  }
}