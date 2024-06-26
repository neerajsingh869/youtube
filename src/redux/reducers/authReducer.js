import { LOAD_PROFILE, LOGIN_LOGOUT_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actions/authAction";

const INITIAL_STATE = {
  accessToken: sessionStorage.getItem('yt-access-token') ? sessionStorage.getItem('yt-access-token') : null,
  googleAccessToken: sessionStorage.getItem('yt-google-access-token') ? sessionStorage.getItem('yt-google-access-token') : null,
  user: sessionStorage.getItem('yt-user') ? JSON.parse(sessionStorage.getItem('yt-user')): null,
  loading: false,
  error: null
}

export const authReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch(type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken,
        googleAccessToken: payload.googleAccessToken,
        loading: false,
        error: null
      }
    case LOGIN_LOGOUT_FAIL:
      return {
        ...state,
        accessToken: null,
        googleAccessToken: null,
        loading: false,
        error: payload
      }
    case LOAD_PROFILE:
      return {
        ...state,
        user: payload,
        error: null
      }
    case LOG_OUT:
      return {
        ...state,
        accessToken: null,
        googleAccessToken: null,
        user: null,
        error: null
      }
    default:
      return state;
  }
}