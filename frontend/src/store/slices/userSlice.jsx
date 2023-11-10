import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    getLoggedInUser(state, action) {
      return action.payload;
    },
    resetLoggedInUser(state, action) {
      return action.payload;
    },
  },
});
export { userSlice };
export const { getLoggedInUser, resetLoggedInUser } = userSlice.actions;
