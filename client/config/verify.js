import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const verify = (id) => {
  const token = Cookies.get("token");
  const decoded = jwt_decode(token);
  console.log(decoded.id, id);
  return decoded.id === id ? true : false;
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return null;
  }
  const serverCookieJwt = req.headers.cookie;
  const jwt = serverCookieJwt.split(";")[0].split("=")[1];
  return jwt;
};
