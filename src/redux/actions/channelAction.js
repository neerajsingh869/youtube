import request from "../../../api";

// action constants
export const CHANNEL_DETAILS_REQUEST = "CHANNEL_DETAILS_REQUEST";
export const CHANNEL_DETAILS_SUCCESS = "CHANNEL_DETAILS_SUCCESS";
export const CHANNEL_DETAILS_FAIL = "CHANNEL_DETAILS_FAIL";

export const SUBSCRIPTION_STATUS_REQUEST = "SUBSCRIPTION_STATUS_REQUEST";
export const SUBSCRIPTION_STATUS_SUCCESS = "SUBSCRIPTION_STATUS_SUCCESS";
export const SUBSCRIPTION_STATUS_FAIL = "SUBSCRIPTION_STATUS_FAIL";

export const SUBSCRIPTIONS_CHANNEL_REQUEST = "SUBSCRIPTIONS_CHANNEL_REQUEST";
export const SUBSCRIPTIONS_CHANNEL_RESET = "SUBSCRIPTIONS_CHANNEL_RESET";
export const SUBSCRIPTIONS_CHANNEL_SUCCESS = "SUBSCRIPTIONS_CHANNEL_SUCCESS";
export const SUBSCRIPTIONS_CHANNEL_FAIL = "SUBSCRIPTIONS_CHANNEL_FAIL";

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

export const getSubscriptionsChannel = (mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST
    })

    let result = null;

    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: SUBSCRIPTIONS_CHANNEL_RESET
      })

      result = await request('/subscriptions', {
        params: {
          part: "snippet,contentDetails",
          maxResults: 20,
          mine: true
        }, 
        headers: {
          Authorization: `Bearer ${getState().auth.googleAccessToken}`
        }
      })
    } else {
      result = await request('/subscriptions', {
        params: {
          part: "snippet,contentDetails",
          maxResults: 20,
          pageToken: getState().subscriptionsChannel.nextPageToken,
          mine: true
        }, 
        headers: {
          Authorization: `Bearer ${getState().auth.googleAccessToken}`
        }
      })
    }

    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: {
        channels: result.data.items,
        nextPageToken: result.data.nextPageToken
      }
    })
  } catch (error) {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      error: error.message
    })
  }
}