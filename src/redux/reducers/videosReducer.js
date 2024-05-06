import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS } from "../actions/videosAction";

const INITIAL_STATE = {
  videos: [],
  loading: false,
  nextPageToken: null
};

export const videosReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case HOME_VIDEOS_SUCCESS: 
      return {
        ...state,
        videos: payload.videos,
        nextPageToken: payload.nextPageToken,
        loading: false
      }
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
} 