import { combineReducers } from "redux";
import { personReducer } from "./personReducer.ts";
import { requestStatusReducer } from "./requestStatusReducer";
import { searchReducer } from "./searchReducer";
const { default: postsReducer } = require("./postsReducer.ts");

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
  requestStatus: requestStatusReducer,
});

export default rootReducer;
