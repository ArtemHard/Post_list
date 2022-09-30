import { axiosInstance } from "../../config/axios";
import { SIGN_IN, SIGN_OUT } from "../types/personTypes";

export const SignIn = (person) => ({
  type: SIGN_IN,
  payload: person,
});

export const SignOut = () => ({
  type: SIGN_OUT,
  payload: {
    token: "",
  },
});

export const SignInQuery =
  ({ email, password, cb }) =>
  async (dispatch) => {
    const response = await axiosInstance.post("signin", {
      email,
      password,
    });

    const person = response.data;

    dispatch(
      SignIn({
        ...person.data,
        token: person.token,
      })
    );

    typeof cb === "function" && cb();
  };
