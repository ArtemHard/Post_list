// import { API_TOKEN } from "../../constants";
import {
  CHANGE_LIKE_POST,
  ADD_NEW_POST,
  SET_ALL_POSTS,
  DELETE_POST,
  GET_SINGLE_POST,
  ADD_COMMENT,
} from "../types/postsTypes";
import { axiosInstance } from "../../config/axios";
import {
  setRequestFailed,
  setRequestFulfilled,
  setRequestStarted,
} from "./requestStatusAC";
import { deleteUserPost } from "./personAC";

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
});

export const changeLike = (post) => ({
  type: CHANGE_LIKE_POST,
  payload: post,
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

  const postsFromApi = response.data;

  dispatch(setAllPosts(postsFromApi));
};

export const addNewPost = (allPosts) => ({
  type: ADD_NEW_POST,
  payload: allPosts,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

export const getSinglePost = (post) => ({
  type: GET_SINGLE_POST,
  payload: post,
});

export const addComment = (post) => ({
  type: ADD_COMMENT,
  payload: post,
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

export const queryAddLike = (postId) => async (dispatch) => {
  let response;
  try {
    response = await axiosInstance.put(`posts/likes/${postId}`);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const postFromApi = response.data;

  dispatch(changeLike(postFromApi));
};
export const queryDeleteLike = (postId) => async (dispatch) => {
  let response;
  try {
    response = await axiosInstance.delete(`posts/likes/${postId}`);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const postFromApi = response.data;

  dispatch(changeLike(postFromApi));
};

export const queryDeletePost = (postId) => async (dispatch) => {
  dispatch(setRequestStarted("deletePending"));
  let response;
  try {
    response = await axiosInstance.delete(`posts/${postId}`);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }

  if (response.status === 200) dispatch(deletePost(postId));
  dispatch(deleteUserPost(postId));
  dispatch(setRequestFulfilled("deleteUserPost-fulfilled"));
};

export const queryGetSinglePost = (postId) => async (dispatch) => {
  dispatch(setRequestStarted("getSinglePost-pending"));
  let response;
  try {
    response = await axiosInstance.get(`posts/${postId}`);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }

  const postFromApi = [response.data];

  dispatch(setAllPosts(postFromApi));
  dispatch(setRequestFulfilled("getSinglePost-Fulfilled"));
};

export const queryAddComment = (id, body) => async (dispatch) => {
  dispatch(setRequestStarted("addComment-pending"));
  let response;
  try {
    response = await axiosInstance.post(`posts/comments/${id}`, body);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
  }

  const postFromApi = response.data;
  dispatch(addComment(postFromApi));
  dispatch(setRequestFulfilled("addComment-Fulfilled"));
};
