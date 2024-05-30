import { COMMENTS_LIST_REQUEST, COMMENTS_LIST_RESET, COMMENTS_LIST_SUCCESS, COMMENTS_LSIT_FAIL } from "../actions/commentsAction";

const COMMENTS_LIST_INITIAL_STATE = {
  loading: false,
  comments: [],
  error: null,
  nextPageToken: null
}

export const commentsListReducer = (state = COMMENTS_LIST_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case COMMENTS_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        nextPageToken: null,
        comments: []
      }
    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, ...payload.comments],
        error: null,
        nextPageToken: payload.nextPageToken,
      }
    case COMMENTS_LSIT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
}