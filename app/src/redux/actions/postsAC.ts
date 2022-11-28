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
  // @ts-ignore
} from "./requestStatusAC.ts";
// @ts-ignore
import { deleteUserPost } from "./personAC.ts";
import { initStateType, PostsType } from "../initState";
import { AllPostsType, PostsACTypes } from "./types/postsACTypes";
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from "redux";

type ThunkType = ThunkAction<Promise<void>, initStateType, unknown, PostsACTypes> 

type DispatchType = Dispatch<PostsACTypes>

export const setAllPosts = (allPosts: AllPostsType) : PostsACTypes   => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
});



export const changeLike = (post: PostsType) : PostsACTypes => ({
  type: CHANGE_LIKE_POST,
  payload: post,
});

export const loadAllPosts = (searchValue: string) : ThunkType => async (dispatch: DispatchType) => {
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

  const postsFromApi: AllPostsType = response.data;

  dispatch(setAllPosts(postsFromApi));
};



export const addNewPost = (allPosts: PostsType) : PostsACTypes => ({
  type: ADD_NEW_POST,
  payload: allPosts,
});



export const deletePost = (postId: string): PostsACTypes => ({
  type: DELETE_POST,
  payload: postId,
});



export const getSinglePost = (post: PostsType) : PostsACTypes => ({
  type: GET_SINGLE_POST,
  payload: post,
});



export const addComment = (post: PostsType) : PostsACTypes => ({
  type: ADD_COMMENT,
  payload: post,
});

export const queryNewPost = (post): ThunkType => async (dispatch: DispatchType) => {

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
  const postFromApi: PostsType = response.data;

  dispatch(addNewPost(postFromApi));
  dispatch(setRequestFulfilled());
};

export const queryAddLike = (postId: string): ThunkType => async (dispatch: DispatchType) => {
  let response;
  try {
    response = await axiosInstance.put(`posts/likes/${postId}`);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const postFromApi: PostsType = response.data;

  dispatch(changeLike(postFromApi));
};
export const queryDeleteLike = (postId: string) : ThunkType => async (dispatch: DispatchType) => {
  let response;
  try {
    response = await axiosInstance.delete(`posts/likes/${postId}`);
  } catch (error) {
    console.log(error.message);
    return;
  }

  const postFromApi: PostsType = response.data;

  dispatch(changeLike(postFromApi));
};

export const queryDeletePost = (postId: string) : ThunkType => async (dispatch: DispatchType) => {
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

export const queryGetSinglePost = (postId: string) : ThunkType => async (dispatch: DispatchType) => {
  dispatch(setRequestStarted("getSinglePost-pending"));
  let response;
  try {
    response = await axiosInstance.get(`posts/${postId}`);
  } catch (error) {
    dispatch(setRequestFailed(error.message));
    return;
  }
  
  const postFromApi: AllPostsType = [response.data]
  dispatch(setAllPosts(postFromApi));
  dispatch(setRequestFulfilled("getSinglePost-Fulfilled"));
};

type bodyType  = {
  [k: string]: string;
}

export const queryAddComment = (id: string, body: bodyType ) : ThunkType => async (dispatch: DispatchType ) => {
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

export const queryDeleteComment = (postId: string, commentId: string) : ThunkType => async (dispatch: DispatchType) => {
  dispatch(setRequestStarted("deleteComment-pending"));
  let response;
  try {
    response = await axiosInstance.delete(
      `posts/comments/${postId}/${commentId}`
    );
  } catch (error) {
    dispatch(setRequestFailed(error.message));
  }

  const postFromApi: PostsType = response.data;
  dispatch(addComment(postFromApi));
  dispatch(setRequestFulfilled("deleteComment-Fulfilled"));
};
