import { addUserInfo } from "@/redux/userSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({});
  // console.log(user);

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem("blogUser"));
    if (localUserInfo) {
      dispatch(addUserInfo(localUserInfo));
      setUser(localUserInfo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("blogUser");
    Cookies.remove("token");
    dispatch(addUserInfo({}));
    router.push("/signIn");
  };
  return (
    <div className="flex flex-col md:flex-row justify-between py-4">
      <Link href="/" className="md:w-1/3">
        <Image src="/logo.png" alt="logo" height={80} width={80} />
      </Link>
      <div className="flex items-center md:w-1/3 bg-white gap-3 pl-3 rounded-md">
        <label htmlFor="search">
          <BsSearch />
        </label>
        <input
          type="text"
          id="search"
          className=" outline-none w-full pr-3"
          placeholder="Search..."
        />
      </div>
      <div className="flex justify-end md:w-1/3 items-center gap-6 font-semibold">
        <Link href="/about" className="">
          About
        </Link>
        <Link href="/contact" className="">
          Contact
        </Link>
        {user?._id ? (
          <div className="avatar placeholder dropdown dropdown-end">
            <label
              tabIndex={0}
              className="bg-neutral-focus text-neutral-content rounded-full cursor-pointer"
            >
              <img
                src={user.image}
                style={{ width: "33px" }}
                className="rounded-full "
                alt="avatar"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/createPost">Post a Blog</Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/signIn" className=" text-blue-700">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
