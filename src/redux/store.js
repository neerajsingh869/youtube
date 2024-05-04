import { createStore, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const INITIAL_STATE = {
  name: "Rakesh",
  age: 32,
};

const reducer = state => state;

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
