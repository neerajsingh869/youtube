import { createStore, applyMiddleware, combineReducers } from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer } from "./reducers/authReducer";
import { selectedVideoReducer, homeVideosReducer } from "./reducers/videosReducer";
import { channelDetailsReducer, checkSubscriptionReducer } from "./reducers/channelReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  subscriptionStatus: checkSubscriptionReducer
})

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
