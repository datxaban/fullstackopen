import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch(setUser(user));
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
    }
  };
};

export default userSlice.reducer;
