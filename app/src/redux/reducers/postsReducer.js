import {
  CHANGE_LIKE_POST,
  ADD_NEW_POST,
  SET_ALL_POSTS,
  DELETE_POST,
  GET_SINGLE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../types/postsTypes";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return action.payload;

    case ADD_NEW_POST:
      return [...state, action.payload];

    case CHANGE_LIKE_POST:
      for (let index = 0; index < state.length; index++) {
        const element = state[index];
        if (element._id === action.payload._id) {
          state.splice(index, 1, action.payload);
          break;
        }
      }
      return [...state];

    case DELETE_POST:
      const newState = state.filter((post) => post._id !== action.payload);
      return newState;

    case GET_SINGLE_POST:
      return action.payload;

    case ADD_COMMENT:
      for (let index = 0; index < state.length; index++) {
        const element = state[index];
        if (element._id === action.payload._id) {
          element.comments = action.payload.comments;
          break;
        }
      }
      return [...state];

    default:
      return state;
  }
};
export default postsReducer;
