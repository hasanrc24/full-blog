import axios from "axios";
import Cookies from "js-cookie";
// let token;
// if (typeof localStorage !== "undefined") {
//   // Code that uses localStorage
//   const data = JSON.parse(localStorage.getItem("blogUser"));
//   token = data.token;
// }
const token = Cookies.get("token");

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const protedtedApi = axios.create({
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

export const getAllBlogs = async () => {
  return await api.get("/blogs");
};

export const postBlog = async (title, body, image = null) => {
  const postData = {
    title,
    body,
  };
  if (image) {
    postData.image = image;
  }
  return await protedtedApi.post("/blogs", postData);
};

export const getSingleBlog = async (id) => {
  return await api.get(`/blogs/${id}`);
};
