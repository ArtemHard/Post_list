const initState = () => {
  return {
    posts: [],
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
      posts: [],
      // name: "",
      // email: "",
      // token: "",
      // posts: [],
    },
  };
};

export default initState;
