import { Author, PersonType, PostsType } from "../../initState";
import {
  ADD_USER_POSTS,
  CHANGE_AVATAR,
  CHANGE_USER_NAME_ABOUT,
  DELETE_USER_POST,
  SIGN_IN,
  SIGN_OUT,
} from "../../types/personTypes";

type SignInActionType = {
  type: typeof SIGN_IN;
  payload: PersonType;
};

type SignOutActionType = {
  type: typeof SIGN_OUT;
  payload: {
    token: "";
  };
};
type SetChangeUserNameAboutActionType = {
  type: typeof CHANGE_USER_NAME_ABOUT;
  payload: Author;
};
type addUserPostsActionType = {
  type: typeof ADD_USER_POSTS;
  payload: {
    posts: Array<PostsType>;
  };
};
type deleteUserPostActionType = {
  type: typeof DELETE_USER_POST;
  payload: string;
};
type changeAvatarActionType = {
  type: typeof CHANGE_AVATAR;
  payload: {
    avatar: string;
  };
};

export type PersonACType =
  | SignInActionType
  | SignOutActionType
  | SetChangeUserNameAboutActionType
  | addUserPostsActionType
  | deleteUserPostActionType
  | changeAvatarActionType


