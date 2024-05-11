import request from "../../../api";

// action constants
export const CHANNEL_DETAILS_REQUEST = "CHANNEL_DETAILS_REQUEST";
export const CHANNEL_DETAILS_SUCCESS = "CHANNEL_DETAILS_SUCCESS";
export const CHANNEL_DETAILS_FAIL = "CHANNEL_DETAILS_FAIL";

export const SUBSCRIPTION_STATUS_REQUEST = "SUBSCRIPTION_STATUS_REQUEST";
export const SUBSCRIPTION_STATUS_SUCCESS = "SUBSCRIPTION_STATUS_SUCCESS";
export const SUBSCRIPTION_STATUS_FAIL = "SUBSCRIPTION_STATUS_FAIL";

// action creator
export const getChannelDetails = (id) => async dispatch => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST
    });

    const response = await request('/channels', {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id
      }
    });

    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: response.data.items[0]
    })
  } catch (error) {
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.message
    })
  }
}

export const checkSubscriptionStatus = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_STATUS_REQUEST
    });

    const response = await request('/subscriptions', {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true
      }, 
      headers: {
        Authorization: `Bearer ${getState().auth.googleAccessToken}`
      }
    })

    dispatch({
      type: SUBSCRIPTION_STATUS_SUCCESS,
      payload: response.data.items.length !== 0
    })
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_STATUS_FAIL,
      payload: error.message
    })
  }
}