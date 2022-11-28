import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { axiosInstance } from "../../config/axios";
import { initStateType, PostsType, UserType } from "../initState";
import { GET_USER_INFO } from "../types/personTypes";
import {
  setRequestFailed,
  setRequestFulfilled,
  setRequestStarted,
  // @ts-ignore
} from "./requestStatusAC.ts";

type GetUserInfoActionType = {
  type: typeof GET_USER_INFO;
  payload: UserType;
};

const getUserInfo = (user: UserType): GetUserInfoActionType => ({
  type: GET_USER_INFO,
  payload: user,
});

export const getUserInfoQuery =
  (
    userId: string
  ): ThunkAction<
    Promise<void>,
    initStateType,
    unknown,
    GetUserInfoActionType
  > =>
  async (dispatch: Dispatch<GetUserInfoActionType>) => {
    dispatch(setRequestStarted());

    let responseUser;
    let responsePosts;
    try {
      responseUser = await axiosInstance.get(`users/${userId}`);
      responsePosts = await axiosInstance.get("posts/");
    } catch (error) {
      dispatch(setRequestFailed(error.message));
      return;
    }

    const userFromApi:UserType = responseUser.data;
    const postsFromApi:Array<PostsType> = responsePosts.data;

    userFromApi.posts = postsFromApi.filter(
      (post) => post.author._id === userId
    );

    dispatch(getUserInfo(userFromApi));

    dispatch(setRequestFulfilled());
  };
