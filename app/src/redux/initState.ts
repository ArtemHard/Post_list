const initState = () => {
  return {
    posts: [] as Array<PostsType> | [],
    search: "",
    requestStatus: "",
    person: {
      name: "",
      about: "",
      avatar: "",
      _id: "",
      email: "",
      __v: 0,
      token: "",
      posts: [] as Array<PostsType> | [],
      // name: "",
      // email: "",
      // token: "",
      // posts: [],
    } as PersonType ,
    user: {} as UserType
  };
};

export type initStateType = typeof initState

export type PersonType = {
  name: string,
  about: string,
  avatar: string,
  _id: string,
  email: string,
  __v: number,
  token: string,
  posts: Array<PostsType>
}



   export interface Author {
      name: string;
      about: string;
      avatar: string;
      _id: string;
      email: string;
      __v: number;
  }

  export interface PostsType {
      image: string;
      likes: string[];
      comments: string[];
      tags: string[];
      isPublished: boolean;
      _id: string;
      title: string;
      author: Author;
      text: string;
      created_at: Date;
      updated_at: Date;
      __v: number;
      updatedAt: Date;
  }

  export interface UserType {
    name: string;
    about: string;
    avatar: string;
    _id: string;
    email: string;
    __v: number;
    posts?: [] | Array<PostsType> | null
}

export default initState;
