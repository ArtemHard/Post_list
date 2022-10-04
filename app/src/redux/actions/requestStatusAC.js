import { REQUEST_STATUS } from "../types/requestStatusTypes";

export const setRequestStarted = (status = "pending") => ({
  type: REQUEST_STATUS,
  payload: status,
});

export const setRequestFailed = (error) => ({
  type: REQUEST_STATUS,
  payload: error,
});

export const setRequestFulfilled = (status = "fulfilled") => ({
  type: REQUEST_STATUS,
  payload: status,
});

export const setRequestEmpty = (status = "") => ({
  type: REQUEST_STATUS,
  payload: status,
});

export const setStatusEmpty = () => (dispatch) => {
  dispatch(setRequestEmpty());
};
