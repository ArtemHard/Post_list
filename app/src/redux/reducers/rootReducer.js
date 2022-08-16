import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
const { default: postsReducer } = require("./postsReducer");

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
});

export default rootReducer;
