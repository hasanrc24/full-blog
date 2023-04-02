import { userLogin, userRegister } from "@/config/axiosInstance";
import { getTokenFromServerCookie, verify } from "@/config/verify";
import { addUserInfo } from "@/redux/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";

const SignIn = () => {
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (register) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "advanced-blog");
      formData.append("cloud_name", "dnqvwwxzv");
      try {
        let pic;
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
          console.log(data);
          localStorage.setItem("blogUser", JSON.stringify(data));
          setLoading(false);
          Cookies.set("token", data.token);
          dispatch(addUserInfo(data));
        } catch (error) {
          console.log(error);
        }
        router.push("/");
        setUserName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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
        setEmail("");
        setPassword("");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
          {register &&
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
            {register ? "Sign up" : "Login"}
          </button>
          {/* <input
            type="submit"
            value={register ? "Sign up" : "Login"}
            className={`btn loading rounded-lg text-white mt-3`}
          /> */}
          {!register && (
            <button className="btn btn-outline rounded-lg">Demo Login</button>
          )}
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
