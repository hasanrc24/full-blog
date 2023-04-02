import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
  // console.log(image, "image");
  if (image !== null) {
    postData.image = image;
  }
  return await api.post("/user/register", postData);
};
