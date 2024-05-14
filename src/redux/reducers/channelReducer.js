import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS, SUBSCRIPTION_STATUS_FAIL, SUBSCRIPTION_STATUS_REQUEST, SUBSCRIPTION_STATUS_SUCCESS } from "../actions/channelAction";

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

const SUBSCRIPTIONS_CHANNEL_INITIAL_STATE = {
  loading: false,
  channels: [],
  nextPageToken: null
}

export const subscriptionsChannelReducer = (state = SUBSCRIPTIONS_CHANNEL_INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SUBSCRIPTIONS_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUBSCRIPTIONS_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        channels: [...state.channels, ...payload.channels],
        nextPageToken: payload.nextPageToken
      }
    case SUBSCRIPTIONS_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state;
  }
}