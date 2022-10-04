// import { API_TOKEN } from "../../constants";
import { ADD_NEW_POST, SET_ALL_POSTS } from "../types/postsTypes";
import { axiosInstance } from "../../config/axios";
import {
  setRequestFailed,
  setRequestFulfilled,
  setRequestStarted,
} from "./requestStatusAC";

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
});

export const loadAllPosts = (searchValue) => async (dispatch) => {
  // const urlForFetch = searchValue ? `/search/?query=${searchValue}` : "/";
  // const response = await fetch(
  //   `https://api.react-learning.ru/posts${urlForFetch}`,
  //   {
  //     headers: {
  //       authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   }
  // );
  dispatch(setRequestStarted());

  let response;

  try {
    response = await axiosInstance.get(`posts/search/`, {
      params: {
        query: searchValue,
      },
    });
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }
  dispatch(setRequestFulfilled());
  console.log(response.status);

  // const postsFromApi = await response.json();
  const postsFromApi = response.data;

  dispatch(setAllPosts(postsFromApi));
};

export const addNewPost = (allPosts) => ({
  type: ADD_NEW_POST,
  payload: allPosts,
});

export const queryNewPost = (post) => async (dispatch) => {
  // const response = await fetch("https://api.react-learning.ru/posts", {
  //   method: "POST",
  //   headers: {
  //     authorization: `Bearer ${API_TOKEN}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: post,
  // });

  dispatch(setRequestStarted());

  let response;

  const bodyObject = JSON.parse(post);
  try {
    response = await axiosInstance.post("posts", bodyObject);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }

  // const postFromApi = await response.json();
  const postFromApi = response.data;

  dispatch(addNewPost(postFromApi));
  dispatch(setRequestFulfilled());
};
