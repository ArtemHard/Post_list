import { axiosInstance } from "../../config/axios";
import { UserType } from "../initState";
import { GET_USER_INFO } from "../types/personTypes";
import { setRequestFailed, setRequestFulfilled, setRequestStarted } from "./requestStatusAC";

type GetUserInfoActionType = {
    type: typeof GET_USER_INFO
    payload: UserType
}

const getUserInfo = (user: UserType) : GetUserInfoActionType => ({
    type: GET_USER_INFO,
    payload: user
})

export const getUserInfoQuery = (userId: string) => async (dispatch: any) => {
    dispatch(setRequestStarted());
console.log('сработал getUserInfoQuery');

  let responseUser;
  let responsePosts
  try {
    responseUser = await axiosInstance.get(`users/${userId}`);
    responsePosts = await axiosInstance.get('posts/')
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }

const userFromApi = responseUser.data;  
const postsFromApi = responsePosts.data;  

userFromApi.posts = postsFromApi.filter((post) => post.author._id === userId);
console.log(userFromApi);

dispatch(getUserInfo(userFromApi));

dispatch(setRequestFulfilled());
};
