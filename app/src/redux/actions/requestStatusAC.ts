import { REQUEST_STATUS } from "../types/requestStatusTypes";


type SetRequestStatusActionType = {
  type: typeof REQUEST_STATUS,
  payload: string
}

export const setRequestStarted = (status: string = "pending"): SetRequestStatusActionType => ({
  type: REQUEST_STATUS,
  payload: status,
});



export const setRequestFailed = (error: string) : SetRequestStatusActionType => ({
  type: REQUEST_STATUS,
  payload: error,
});


export const setRequestFulfilled = (status: string = "fulfilled") : SetRequestStatusActionType => ({
  type: REQUEST_STATUS,
  payload: status,
});



export const setRequestEmpty = (status = "") : SetRequestStatusActionType=> ({
  type: REQUEST_STATUS,
  payload: status,
});

export const setStatusEmpty = () => (dispatch) => {
  dispatch(setRequestEmpty());
};
