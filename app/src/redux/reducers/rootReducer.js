import { combineReducers } from "redux";
import { personReducer } from "./personReducer";
import { searchReducer } from "./searchReducer";
const { default: postsReducer } = require("./postsReducer");

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
});

export default rootReducer;
