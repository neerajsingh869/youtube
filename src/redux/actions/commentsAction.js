
import request from "../../../api";

// action constants
export const COMMENTS_LIST_SUCCESS = "COMMENTS_LIST_SUCCESS";
export const COMMENTS_LSIT_FAIL = "COMMENTS_LSIT_FAIL";
export const COMMENTS_LIST_REQUEST = "COMMENTS_LIST_REQUEST";

// action creators
export const getCommentsOfVideoById = id => async dispatch => {
  try {
    dispatch({
      type: COMMENTS_LIST_REQUEST
    })

    const response = await request('/commentThreads', {
      params: {
        part: "snippet",
        videoId: id
      }
    })

    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: response.data.items
    })
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: COMMENTS_LSIT_FAIL,
      payload: error.message
    })
  }
}