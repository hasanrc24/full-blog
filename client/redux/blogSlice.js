import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  singleBlog: {},
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    addSingleBlog: (state, action) => {
      state.singleBlog = action.payload;
    },
    addComment: (state, action) => {
      state.singleBlog.comments.push(action.payload);
    },
  },
});

export const blogSelector = (state) => state.blogReducer;
export const { addBlogs, addSingleBlog, addComment } = blogSlice.actions;
export default blogSlice.reducer;
