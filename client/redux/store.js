import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    userReducer,
    blogReducer,
  },
});

export const wrapper = createWrapper(() => store);
