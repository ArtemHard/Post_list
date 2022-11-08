import { PostsType } from "../../initState";
import {
  ADD_COMMENT,
  ADD_NEW_POST,
  CHANGE_LIKE_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  SET_ALL_POSTS,
} from "../../types/postsTypes";

export type AllPostsType = Array<PostsType>;

type setAllPostsActionType = {
  type: typeof SET_ALL_POSTS;
  payload: AllPostsType;
};
type changeLikeActionType = {
  type: typeof CHANGE_LIKE_POST;
  payload: PostsType;
};

type addNewPostActionType = {
  type: typeof ADD_NEW_POST;
  payload: PostsType;
};
type DeltePostActionType = {
  type: typeof DELETE_POST;
  payload: string;
};
type GetSinglePostActionType = {
  type: typeof GET_SINGLE_POST;
  payload: PostsType;
};
type AddCommentActionType = {
  type: typeof ADD_COMMENT;
  payload: PostsType;
};

export type PostsACTypes =
  | setAllPostsActionType
  | changeLikeActionType
  | addNewPostActionType
  | DeltePostActionType
  | GetSinglePostActionType
  | AddCommentActionType
