import { userLogin } from "@/config/axiosInstance";
import { getTokenFromServerCookie, verify } from "@/config/verify";
import { addUserInfo } from "@/redux/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [register, setRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (register) {
      console.log("register");
    } else {
      try {
        const { data } = await userLogin(email, password);
        localStorage.setItem("blogUser", JSON.stringify(data));
        Cookies.set("token", data.token);
        // Cookies.set("userId", data._id);
        // Cookies.set("userEmail", data.email);
        // Cookies.set("userImage", data.image);
        dispatch(addUserInfo(data));
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 shadow-xl w-96">
        <p className="text-2xl text-center mb-4 font-semibold">Advanced Blog</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-4">
          {register && (
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
              required
            />
          )}
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
            required
          />
          <input
            type="submit"
            value={register ? "Sign up" : "Login"}
            className=" btn rounded-lg text-white mt-3"
          />
          <button className="btn btn-outline rounded-lg">Demo Login</button>
        </form>
        {register ? (
          <p onClick={() => setRegister(false)} className="cursor-pointer">
            Already have an account?{" "}
            <span className="text-blue-500">Sign In</span>
          </p>
        ) : (
          <p onClick={() => setRegister(true)} className="cursor-pointer">
            Don't have an account?{" "}
            <span className="text-blue-500">Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;

export async function getServerSideProps({ req }) {
  const token = getTokenFromServerCookie(req);
  if (token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
