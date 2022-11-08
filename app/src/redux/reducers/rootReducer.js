import { combineReducers } from "redux";
import { personReducer } from "./personReducer.ts";
import { requestStatusReducer } from "./requestStatusReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer.ts";
const { default: postsReducer } = require("./postsReducer.ts");

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
  requestStatus: requestStatusReducer,
  user: userReducer
});

export default rootReducer;
