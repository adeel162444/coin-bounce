import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getAllUsers(state, action) {
      return action.payload;
    },
  },
});
export { usersSlice };
export const { getAllUsers } = usersSlice.actions;
