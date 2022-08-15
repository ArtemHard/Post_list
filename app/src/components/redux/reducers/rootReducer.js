import { combineReducers } from "redux";
const { default: postsReducer } = require("./postsReducer");

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
