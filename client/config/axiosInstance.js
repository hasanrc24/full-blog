import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const userLogin = async (email, password) => {
  return await api.post("/user/login", { email, password });
};

export const userRegister = async (username, email, password, image = null) => {
  const postData = {
    name: username,
    email: email,
    password: password,
  };
  if (image) {
    postData.image = image;
  }
  return await api.post("/user/register", postData);
};

export const getAllBlogs = async (page) => {
  return await api.get(`/blogs?page=${page}`);
};

export const postBlog = async (title, body, image = null) => {
  const postData = {
    title,
    body,
  };
  if (image) {
    postData.image = image;
  }
  return await protectedApi.post("/blogs", postData);
};

export const getSingleBlog = async (id) => {
  return await api.get(`/blogs/${id}`);
};

export const editABlog = async (id, title, body) => {
  return await protectedApi.put(`/blogs/${id}`, { title, body });
};

export const deleteBlog = async (id) => {
  return await protectedApi.delete(`/blogs/${id}`);
};

export const postComment = async (body, blogId) => {
  return await protectedApi.post("/comments", { body, blogId });
};

export const searchBlog = async (value) => {
  return await api.get(`/blogs/search?search=${value}`);
};
