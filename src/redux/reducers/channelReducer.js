import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SUBSCRIPTION_STATUS_FAIL, SUBSCRIPTION_STATUS_REQUEST, SUBSCRIPTION_STATUS_SUCCESS } from "../actions/channelAction";

const CHANNEL_DETAILS_INITIAL_STATE = {
  loading: false,
  channel: null,

}

export const channelDetailsReducer = (state = CHANNEL_DETAILS_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        channel: payload
      }
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        channel: null,
        error: payload
      }
    default:
      return state;
  }
}

const SUBSCRIPTION_INITIAL_STATE = {
  loading: false,
  subscriptionStatus: false,
}

export const checkSubscriptionReducer = (state = SUBSCRIPTION_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SUBSCRIPTION_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUBSCRIPTION_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptionStatus: payload
      }
    case SUBSCRIPTION_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        subscriptionStatus: false,
        error: payload
      }
    default:
      return state;
  }
}