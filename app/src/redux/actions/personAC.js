import { axiosInstance } from "../../config/axios";
import { ADD_USER_POSTS, SIGN_IN, SIGN_OUT } from "../types/personTypes";

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
  const response = await axiosInstance.get("posts/");

  const postsFromApi = response.data;

  const postsUser = postsFromApi.filter((post) => post.author._id === personId);
  console.log(postsUser);
  dispatch(addUserPosts(postsUser));
  // dispatch(setAllPosts(postsFromApi));
};
