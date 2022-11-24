import { axiosInstance } from "../../config/axios";
import { Author, PersonType, PostsType } from "../initState";
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

export const deleteUserToken = () => (dispatch) => {
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

export const SignInQuery =
  ({ email, password , cb }) =>
  async (dispatch) => {
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

export const loadPersonPosts = (personId: string) => async (dispatch) => {
  dispatch(setRequestStarted());

  let response;
  try {
    response = await axiosInstance.get("posts/");
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }

  const postsFromApi = response.data;

  const postsUser = postsFromApi.filter((post) => post.author._id === personId);
  dispatch(setRequestFulfilled());
  dispatch(addUserPosts(postsUser));
  // dispatch(setAllPosts(postsFromApi));
};

export const changeUserNameAboutQuery = (newPerson) => async (dispatch) => {
  dispatch(setRequestStarted());

  let response;

  try {
    response = await axiosInstance.patch("users/me", newPerson);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }
  const newDataUserFromApi = response.data;
  dispatch(setRequestFulfilled());
  dispatch(SetChangeUserNameAbout(newDataUserFromApi));
};

export const changeAvatarQuery = (urlObject) => async (dispatch) => {
  dispatch(setRequestStarted());
  console.log(urlObject);
  let response;

  try {
    response = await axiosInstance.patch("users/me/avatar", urlObject);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
  }

  dispatch(setRequestFulfilled());
  console.log(response.data?.avatar);
  dispatch(changeAvatar(response.data?.avatar));
};

