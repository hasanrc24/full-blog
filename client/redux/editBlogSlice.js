import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
};

export const editBlogSlice = createSlice({
  name: "editBlog",
  initialState,
  reducers: {
    editBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const editBlogSelector = (state) => state.editBlogReducer;
export const { editBlog } = editBlogSlice.actions;
export default editBlogSlice.reducer;
