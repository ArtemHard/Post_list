import { axiosInstance } from "../../config/axios";
import {
  ADD_USER_POSTS,
  CHANGE_USER_NAME_ABOUT,
  SIGN_IN,
  SIGN_OUT,
} from "../types/personTypes";
import {
  setRequestFailed,
  setRequestFulfilled,
  setRequestStarted,
} from "./requestStatusAC";

export const SignIn = (person) => ({
  type: SIGN_IN,
  payload: person,
});

export const SignOut = () => ({
  type: SIGN_OUT,
  payload: {
    token: "",
  },
});

export const SetChangeUserNameAbout = (newData) => ({
  type: CHANGE_USER_NAME_ABOUT,
  payload: newData,
});

export const addUserPosts = (userPosts) => ({
  type: ADD_USER_POSTS,
  payload: {
    posts: userPosts,
  },
});

export const SignInQuery =
  ({ email, password, cb }) =>
  async (dispatch) => {
    const response = await axiosInstance.post("signin", {
      email,
      password,
    });

    const person = response.data;

    dispatch(
      SignIn({
        ...person.data,
        token: person.token,
      })
    );

    typeof cb === "function" && cb();
  };

export const loadPersonPosts = (personId) => async (dispatch) => {
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
