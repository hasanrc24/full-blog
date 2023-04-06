import Cookies from "js-cookie";

export const getTokenFromLocalCookie = () => {
  return Cookies.get("token");
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return null;
  }
  const serverCookieJwt = req.headers.cookie;
  const jwt = serverCookieJwt.split(";")[0].split("=")[1];
  return jwt;
};
