import { REQUEST_STATUS } from "../types/requestStatusTypes";

export const requestStatusReducer = (state = "", action: any) : string => {
  switch (action.type) {
    case REQUEST_STATUS:
      return action.payload;

    default:
      return state;
  }
};
