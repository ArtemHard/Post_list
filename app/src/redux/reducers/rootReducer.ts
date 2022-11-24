import { combineReducers } from "redux";
//@ts-ignore
import { personReducer } from "./personReducer.ts";
//@ts-ignore
import postsReducer from "./postsReducer.ts";
//@ts-ignore
import { requestStatusReducer } from "./requestStatusReducer.ts";
//@ts-ignore
import { searchReducer } from "./searchReducer.ts";
//@ts-ignore
import { userReducer } from "./userReducer.ts";


const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
  requestStatus: requestStatusReducer,
  user: userReducer
});

export default rootReducer;

export type AppStateType = ReturnType<typeof rootReducer>

// let state : AppStateType
// state.person.

