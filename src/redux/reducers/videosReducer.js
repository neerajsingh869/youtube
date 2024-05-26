import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_RESET,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_RESET,
  HOME_VIDEOS_SUCCESS,
  LIKED_VIDEOS_FAIL,
  LIKED_VIDEOS_REQUEST,
  LIKED_VIDEOS_RESET,
  LIKED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_FAIL,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_RESET,
  SEARCHED_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  VIDEO_RATING_FAIL,
  VIDEO_RATING_REQUEST,
  VIDEO_RATING_SUCCESS,
} from "../actions/videosAction";

const HOME_VIDEOS_INITIAL_STATE = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
  error: null
};

export const homeVideosReducer = (
  state = HOME_VIDEOS_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_VIDEOS_RESET:
      return {
        ...state,
        videos: [],
        loading: false,
        nextPageToken: null,
        activeCategory: "All",
        error: null
      }
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          payload.category === state.activeCategory
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        loading: false,
        activeCategory: payload.category,
        error: null
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const SELECTED_VIDEO_INITIAL_STATE = {
  loading: false,
  video: null,
  error: null
};

export const selectedVideoReducer = (
  state = SELECTED_VIDEO_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: payload,
        error: null
      };
    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        video: null,
      };
    default:
      return state;
  }
};

const SEARCHED_VIDEOS_INITIAL_STATE = {
  loading: false,
  videos: [],
  nextPageToken: null,
  prevKeyword: null,
  error: null
};

export const searchedVideosReducer = (
  state = SEARCHED_VIDEOS_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCHED_VIDEOS_RESET:
      return {
        ...state,
        loading: false,
        videos: [],
        nextPageToken: null,
        prevKeyword: null,
        error: null
      }
    case SEARCHED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCHED_VIDEOS_SUCCESS:
      if (state.prevKeyword === payload.currKeyword) {
        return {
          ...state,
          loading: false,
          videos: [...state.videos, ...payload.videos],
          nextPageToken: payload.nextPageToken,
          error: null
        };
      } else {
        return {
          ...state,
          loading: false,
          videos: [...payload.videos],
          nextPageToken: payload.nextPageToken,
          prevKeyword: payload.currKeyword,
          error: null
        };
      }
    case SEARCHED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const CHANNEL_VIDEOS_INITIAL_STATE = {
  loading: false,
  videos: [],
  nextPageToken: null,
  error: null
};

export const channelVideosReducer = (
  state = CHANNEL_VIDEOS_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_VIDEOS_RESET:
      return {
        ...state,
        loading: false,
        videos: [],
        nextPageToken: null,
        error: null
      }
    case CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, ...payload.videos],
        nextPageToken: payload.nextPageToken,
        error: null
      };
    case CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const LIKED_VIDEOS_INITIAL_STATE = {
  loading: false,
  videos: [],
  nextPageToken: null,
  error: null
};

export const likedVideosReducer = (
  state = LIKED_VIDEOS_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case LIKED_VIDEOS_RESET:
      return {
        ...state,
        loading: false,
        videos: [],
        nextPageToken: null,
        error: null
      }
    case LIKED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LIKED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, ...payload.videos],
        nextPageToken: payload.nextPageToken,
        error: null
      };
    case LIKED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const VIDEO_RATING_INITIAL_STATE = {
  loading: false,
  videoRating: null,
  error: null
}

export const videoRatingReducer = (state = VIDEO_RATING_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case VIDEO_RATING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case VIDEO_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        videoRating: payload,
        error: null
      }
    case VIDEO_RATING_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
}
