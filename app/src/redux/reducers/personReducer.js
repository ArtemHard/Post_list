import { ADD_USER_POSTS, SIGN_IN, SIGN_OUT } from "../types/personTypes";

export const personReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      };

    case ADD_USER_POSTS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
