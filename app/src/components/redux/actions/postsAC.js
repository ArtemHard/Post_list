import { API_TOKEN } from "../../../constants";
import { ADD_NEW_POST, SET_ALL_POSTS } from "../types/postsTypes";

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
});

export const loadAllPosts = () => async (dispatch) => {
  const response = await fetch("https://api.react-learning.ru/posts", {
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const postsFromApi = await response.json();

  dispatch(setAllPosts(postsFromApi));
};

export const addNewPost = (allPosts) => ({
  type: ADD_NEW_POST,
  payload: allPosts,
});

export const queryNewPost = (post) => async (dispatch) => {
  const response = await fetch("https://api.react-learning.ru/posts", {
    method: "POST",
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: post,
  });

  const postFromApi = await response.json();

  dispatch(addNewPost(postFromApi));
};
