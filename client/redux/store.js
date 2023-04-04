import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import editBlogReducer from "./editBlogSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    userReducer,
    blogReducer,
    editBlogReducer,
  },
});

export const wrapper = createWrapper(() => store);
