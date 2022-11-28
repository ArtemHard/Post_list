import { Dispatch } from "redux";
import { axiosInstance } from "../../config/axios";
import { Author, initStateType, PersonType, PostsType } from "../initState";
import { ThunkAction } from 'redux-thunk'
// import { API_TOKEN } from "../../constants";
import {
  ADD_USER_POSTS,
  CHANGE_AVATAR,
  CHANGE_USER_NAME_ABOUT,
  DELETE_USER_POST,
  SIGN_IN,
  SIGN_OUT,
} from "../types/personTypes";
import {
  setRequestFailed,
  setRequestFulfilled,
  setRequestStarted,
  // @ts-ignore
} from "./requestStatusAC.ts";
import { PersonACType } from "./types/personACTypes";

type ThunkType = ThunkAction<Promise<void>, initStateType, unknown, PersonACType> 

export const SignIn = (person: PersonType): PersonACType => ({
  type: SIGN_IN,
  payload: person,
});



export const SignOut = (): PersonACType => ({
  type: SIGN_OUT,
  payload: {
    token: "",
  },
});

export const deleteUserToken = () => (dispatch: DispatchType) => {
  localStorage.removeItem("token");
  dispatch(SignOut());
};



export const SetChangeUserNameAbout = (newData: Author): PersonACType => ({
  type: CHANGE_USER_NAME_ABOUT,
  payload: newData,
});



export const addUserPosts = (userPosts: Array<PostsType>) : PersonACType => ({
  type: ADD_USER_POSTS,
  payload: {
    posts: userPosts,
  },
});



export const deleteUserPost = (postId: string): PersonACType => ({
  type: DELETE_USER_POST,
  payload: postId,
});



export const changeAvatar = (url:string) : PersonACType => ({
  type: CHANGE_AVATAR,
  payload: {
    avatar: url,
  },
});

type SignInQueryDataType = {
  email: string
  password: string
  cb: any
}
export const SignInQuery = ({ email, password , cb } : SignInQueryDataType) : ThunkType =>  async (dispatch: DispatchType) => {
    const response = await axiosInstance.post("signin", {
      email,
      password,
    });

    const person = response.data;
    localStorage.setItem("token", person?.token);
    dispatch(
      SignIn({
        ...person.data,
        token: person.token,
      })
    );

    typeof cb === "function" && cb();
  };

export const loadPersonPosts = (personId: string) : ThunkType => async (dispatch: DispatchType) => {
  dispatch(setRequestStarted());

  let response;
  try {
    response = await axiosInstance.get("posts/");
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }

  type postsFromApiType = [] | Array<PostsType>
  const postsFromApi: postsFromApiType = response.data;

  const postsUser = postsFromApi.filter((post) => post.author._id === personId);
  dispatch(setRequestFulfilled());
  dispatch(addUserPosts(postsUser));
  // dispatch(setAllPosts(postsFromApi));
};

export const changeUserNameAboutQuery = (newPerson: string): ThunkType => async (dispatch: DispatchType) => {
  dispatch(setRequestStarted());
  let response;

  try {
    response = await axiosInstance.patch("users/me", newPerson);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }
  const newDataUserFromApi: Author = response.data;
  dispatch(setRequestFulfilled());
  dispatch(SetChangeUserNameAbout(newDataUserFromApi));
};


type UrlObjectType = {
  avatar: string
}
type DispatchType = Dispatch<PersonACType>

export const changeAvatarQuery = (urlObject: UrlObjectType)
: ThunkType=> async (dispatch: DispatchType) => {
  dispatch(setRequestStarted());
  
  let response;

  try {
    response = await axiosInstance.patch("users/me/avatar", urlObject);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
  }

  dispatch(setRequestFulfilled());
  dispatch(changeAvatar(response.data?.avatar));
};

