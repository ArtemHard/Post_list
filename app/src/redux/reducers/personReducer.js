import {
  ADD_USER_POSTS,
  CHANGE_AVATAR,
  CHANGE_USER_NAME_ABOUT,
  SIGN_IN,
  SIGN_OUT,
} from "../types/personTypes";

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

    case CHANGE_USER_NAME_ABOUT:
      return {
        ...state,
        ...action.payload,
      };
    case CHANGE_AVATAR:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
