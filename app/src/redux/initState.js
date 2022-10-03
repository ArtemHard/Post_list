const initState = () => {
  return {
    posts: [],
    search: "",
    person: {
      name: "Иван Иванов",
      about: "Писатель",
      avatar: "https://react-learning.ru/image-compressed/default-image.jpg",
      _id: "6267aa7297fcd005ee67127b",
      email: "v1215@mail.ru",
      __v: 0,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3YWE3Mjk3ZmNkMDA1ZWU2NzEyN2IiLCJpYXQiOjE2NjQ4MTA0NzEsImV4cCI6MTY5NjM0NjQ3MX0.4ZRbs6pqekOy_BuhxHo4L09Gpr8uSj2faTJnVlJzrEw",
      posts: [],
      // name: "",
      // email: "",
      // token: "",
      // posts: [],
    },
  };
};

export default initState;
