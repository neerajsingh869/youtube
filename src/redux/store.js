import { createStore, applyMiddleware, combineReducers } from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer } from "./reducers/authReducer";
import { selectedVideoReducer, homeVideosReducer, searchedVideosReducer, channelVideosReducer, likedVideosReducer, videoRatingReducer } from "./reducers/videosReducer";
import { channelDetailsReducer, checkSubscriptionReducer, subscriptionsChannelReducer } from "./reducers/channelReducer";
import { commentsListReducer } from "./reducers/commentsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  subscriptionStatus: checkSubscriptionReducer,
  commentsList: commentsListReducer,
  searchedVideos: searchedVideosReducer,
  subscriptionsChannel: subscriptionsChannelReducer,
  channelVideos: channelVideosReducer,
  likedVideos: likedVideosReducer,
  videoRating: videoRatingReducer
})

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
