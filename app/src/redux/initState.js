const initState = () => {
  return {
    posts: [],
    search: "",
    person: {
      name: "",
      email: "",
      token: "",
    },
  };
};

export default initState;
