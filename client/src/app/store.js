import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
