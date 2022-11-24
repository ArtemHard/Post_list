import { SET_SEARCH_VALUE } from "../types/searchTypes";

export const searchReducer = (state = "", action: any) : string => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return action.payload;

    default:
      return state;
  }
};
