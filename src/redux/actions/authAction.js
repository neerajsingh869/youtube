import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

// action constants
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOGOUT_FAIL = "LOGIN_LOGOUT_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOG_OUT = "LOG_OUT";
export const LOAD_PROFILE = "LOAD_PROFILE";

// action creators
export const login = () => async dispatch => {
  try {
    // dispatch login request
    dispatch({type: LOGIN_REQUEST})

    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = result.user.accessToken;
    const googleAccessToken = credential.accessToken;

    const profile = {
      name: result.user.displayName,
      photoUrl: result.user.photoURL
    }

    sessionStorage.setItem('yt-access-token', accessToken);
    sessionStorage.setItem('yt-user', JSON.stringify(profile));
    sessionStorage.setItem('yt-google-access-token', googleAccessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken,
        googleAccessToken
      }
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile
    })
  } catch (error) {
    dispatch({
      type: LOGIN_LOGOUT_FAIL,
      payload: error.message
    })
  }
}

export const logout = () => async dispatch => {
  try {
    await auth.signOut();

    dispatch({
      type: LOG_OUT,
    })
  
    sessionStorage.removeItem('yt-access-token');
    sessionStorage.removeItem('yt-user');
    sessionStorage.removeItem('yt-google-access-token');
  } catch (error) {
    dispatch({
      type: LOGIN_LOGOUT_FAIL,
      payload: error.message
    })
  }
}