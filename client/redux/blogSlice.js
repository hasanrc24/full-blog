import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const blogSelector = (state) => state.blogReducer;
export const { addBlogs } = blogSlice.actions;
export default blogSlice.reducer;
