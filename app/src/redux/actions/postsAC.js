// import { API_TOKEN } from "../../constants";
import { ADD_NEW_POST, SET_ALL_POSTS } from "../types/postsTypes";
import { axiosInstance } from "../../config/axios";
import { addUserPosts } from "./personAC";

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
});

export const loadAllPosts = (searchValue, personId) => async (dispatch) => {
  // const urlForFetch = searchValue ? `/search/?query=${searchValue}` : "/";
  // const response = await fetch(
  //   `https://api.react-learning.ru/posts${urlForFetch}`,
  //   {
  //     headers: {
  //       authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   }
  // );

  const response = await axiosInstance.get(`posts/search/`, {
    params: {
      query: searchValue,
    },
  });

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

  const bodyObject = JSON.parse(post);

  const response = await axiosInstance.post("posts", bodyObject);

  // const postFromApi = await response.json();
  const postFromApi = response.data;

  dispatch(addNewPost(postFromApi));
};
