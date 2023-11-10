import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/usersSlice";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    user: userSlice.reducer,
  },
});
export default store;
