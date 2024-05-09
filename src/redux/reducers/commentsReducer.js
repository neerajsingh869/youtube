import { COMMENTS_LIST_REQUEST, COMMENTS_LIST_SUCCESS, COMMENTS_LSIT_FAIL } from "../actions/commentsAction";

const COMMENTS_LIST_INITIAL_STATE = {
  loading: false,
  comments: []
}

export const commentsListReducer = (state = COMMENTS_LIST_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case COMMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COMMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: payload
      }
    case COMMENTS_LSIT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        comments: []
      }
    default:
      return state;
  }
}