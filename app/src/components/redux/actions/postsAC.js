import { API_TOKEN } from "../../../constants";
import { SET_ALL_POSTS } from "../types/postsTypes";

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
