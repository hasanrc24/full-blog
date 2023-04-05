import { userLogin, userRegister } from "@/config/axiosInstance";
import { getTokenFromServerCookie, verify } from "@/config/verify";
import { addUserInfo } from "@/redux/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import Head from "next/head";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const [usRegister, setUsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const userName = watch("name");
  const email = watch("user_email");
  const password = watch("password");
  const [picture, setPicture] = useState(null);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    if (usRegister) {
      // To register a user
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "advanced-blog");
      formData.append("cloud_name", "dnqvwwxzv");
      try {
        let pic;
        // Handle if user uploads image
        if (file) {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dnqvwwxzv/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const picData = await res.json();
          pic = picData?.url?.toString();
          setPicture(picData?.url?.toString());
        }

        try {
          const { data } = await userRegister(userName, email, password, pic);
          localStorage.setItem("blogUser", JSON.stringify(data));
          setLoading(false);
          Cookies.set("token", data.token);
          dispatch(addUserInfo(data));
        } catch (error) {
          console.log(error);
        }
        router.push("/");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      // To login a user
      try {
        const { data } = await userLogin(email, password);
        localStorage.setItem("blogUser", JSON.stringify(data));
        Cookies.set("token", data.token);
        dispatch(addUserInfo(data));
        router.push("/");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Advanced Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 shadow-xl w-96">
          <p className="text-2xl text-center mb-4 font-semibold">
            Advanced Blog
          </p>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-2 my-4"
          >
            {usRegister && (
              <input
                type="text"
                id="name"
                placeholder="Name"
                // value={userName}
                // onChange={(e) => setUserName(e.target.value)}
                className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
                {...register("name", { required: true })}
              />
            )}
            {errors.name && (
              <span className="text-xs text-red-600">Name is required</span>
            )}
            <input
              type="email"
              id="email"
              placeholder="Email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
              {...register("user_email", {
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              })}
            />
            {errors.user_email?.type === "required" && (
              <p className="text-red-600 text-xs"> Please enter your Email</p>
            )}
            {errors.user_email?.type === "pattern" && (
              <p className="text-red-600 text-xs"> Please enter valid Email</p>
            )}
            <input
              type="password"
              id="password"
              placeholder="Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="p-3 border-b-2 border-brand/50 outline-none focus:border-brand/80"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-600 text-xs">
                {" "}
                Please enter your Password
              </p>
            )}
            {usRegister &&
              (imageUrl ? (
                <div className="flex mt-2">
                  <img
                    src={imageUrl}
                    className="h-10 object-contain rounded-lg"
                    alt="Selected file"
                  />
                  <IoMdCloseCircle
                    className="-ml-2 -mt-2 z-10 text-brand/90 cursor-pointer"
                    onClick={() => setImageUrl(null)}
                  />
                </div>
              ) : (
                <>
                  <label
                    htmlFor="file"
                    onClick={handleClick}
                    className="cursor-pointer flex gap-2 mt-2"
                  >
                    <img
                      className="h-7"
                      src="https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png"
                      alt="img-upload"
                    />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              ))}
            <button
              type="submit"
              className={`btn ${
                loading && "loading btn-disabled"
              } rounded-lg text-white mt-3`}
            >
              {usRegister ? "Sign up" : "Login"}
            </button>
            {/* <input
            type="submit"
            value={userRegister ? "Sign up" : "Login"}
            className={`btn loading rounded-lg text-white mt-3`}
          /> */}
            {!usRegister && (
              <div className="flex justify-evenly">
                <button className="btn btn-outline rounded-lg">
                  Guest Login
                </button>
                <button className="btn btn-outline rounded-lg">
                  Admin Login
                </button>
              </div>
            )}
          </form>
          {usRegister ? (
            <p onClick={() => setUsRegister(false)} className="cursor-pointer">
              Already have an account?{" "}
              <span className="text-blue-500">Sign In</span>
            </p>
          ) : (
            <p onClick={() => setUsRegister(true)} className="cursor-pointer">
              Don't have an account?{" "}
              <span className="text-blue-500">Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </>
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
