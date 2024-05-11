
import request from "../../../api";

// action constants
export const COMMENTS_LIST_SUCCESS = "COMMENTS_LIST_SUCCESS";
export const COMMENTS_LSIT_FAIL = "COMMENTS_LSIT_FAIL";
export const COMMENTS_LIST_REQUEST = "COMMENTS_LIST_REQUEST";

export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAIL = "CREATE_COMMENT_FAIL";
export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";

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

export const addComment = (id, commentText) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COMMENT_REQUEST
    })

    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: commentText
          }
        }
      }
    }

    await request.post('/commentThreads', obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.googleAccessToken}`
      }
    })

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    })

    setTimeout(() => dispatch(getCommentsOfVideoById(id)), 60000 * 4);
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.message
    })
  }
}