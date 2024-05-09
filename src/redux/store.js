import { createStore, applyMiddleware, combineReducers } from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer } from "./reducers/authReducer";
import { selectedVideoReducer, homeVideosReducer } from "./reducers/videosReducer";
import { channelDetailsReducer, checkSubscriptionReducer } from "./reducers/channelReducer";
import { commentsListReducer } from "./reducers/commentsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  subscriptionStatus: checkSubscriptionReducer,
  commentsList: commentsListReducer
})

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
