
import request from "../../../api";

// action constants
export const COMMENTS_LIST_SUCCESS = "COMMENTS_LIST_SUCCESS";
export const COMMENTS_LSIT_FAIL = "COMMENTS_LSIT_FAIL";
export const COMMENTS_LIST_REQUEST = "COMMENTS_LIST_REQUEST";
export const COMMENTS_LIST_RESET = "COMMENTS_LIST_RESET";

export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAIL = "CREATE_COMMENT_FAIL";
export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";

// action creators
export const getCommentsOfVideoById = (id, mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENTS_LIST_REQUEST
    })

    let response;
    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: COMMENTS_LIST_RESET
      });

      response = await request('/commentThreads', {
        params: {
          part: "snippet",
          videoId: id,
          maxResults: 20
        }
      })
    } else {
      response = await request('/commentThreads', {
        params: {
          part: "snippet",
          videoId: id,
          maxResults: 20,
          pageToken: getState().commentsList.nextPageToken,
        }
      })
    }

    dispatch({
      type: COMMENTS_LIST_SUCCESS,
      payload: {
        comments: response.data.items,
        nextPageToken: response.data.nextPageToken
      }
    })
  } catch (error) {
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
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.message
    })
  }
}