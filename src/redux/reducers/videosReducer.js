import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, SEARCHED_VIDEOS_FAIL, SEARCHED_VIDEOS_REQUEST, SEARCHED_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actions/videosAction";

const HOME_VIDEOS_INITIAL_STATE = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: 'All'
};

export const homeVideosReducer = (state = HOME_VIDEOS_INITIAL_STATE, action) => {
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
        videos: payload.category === state.activeCategory ? [...state.videos, ...payload.videos] : payload.videos,
        nextPageToken: payload.nextPageToken,
        loading: false,
        activeCategory: payload.category
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

const SELECTED_VIDEO_INITIAL_STATE = {
  loading: false,
  video: null
}

export const selectedVideoReducer = (state = SELECTED_VIDEO_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SELECTED_VIDEO_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: payload
      }
    case SELECTED_VIDEO_FAIL: 
      return {
        ...state,
        loading: false,
        error: payload,
        video: null
      }
    default:
      return state;
  }
}

const SEARCHED_VIDEOS_INITIAL_STATE = {
  loading: false,
  videos: [],
  nextPageToken: null,
}

export const searchedVideosReducer = (state = SEARCHED_VIDEOS_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SEARCHED_VIDEOS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case SEARCHED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, ...payload.videos],
        nextPageToken: payload.nextPageToken
      }
    case SEARCHED_VIDEOS_FAIL: 
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
}

const CHANNEL_VIDEOS_INITIAL_STATE = {
  loading: false,
  videos: []
}

export const channelVideosReducer = (state = CHANNEL_VIDEOS_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case CHANNEL_VIDEOS_REQUEST:
      return {
        ...state, 
        loading: true
      }
    case CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state, 
        loading: false,
        videos: payload
      }
    case CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
}