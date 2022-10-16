import {
  ADD_LIKE_POST,
  ADD_NEW_POST,
  SET_ALL_POSTS,
} from "../types/postsTypes";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return action.payload;

    case ADD_NEW_POST:
      return [...state, action.payload];

    case ADD_LIKE_POST:
      for (let index = 0; index < state.length; index++) {
        const element = state[index];
        if (element._id === action.payload._id) {
          state.splice(index, 1, action.payload);
          break;
        }
      }
      return [...state];

    default:
      return state;
  }
};
export default postsReducer;
