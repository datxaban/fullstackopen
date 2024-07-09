import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const blogSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = blogSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export default blogSlice.reducer;
