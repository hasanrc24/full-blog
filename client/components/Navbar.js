import { searchBlog } from "@/config/axiosInstance";
import { addUserInfo } from "@/redux/userSlice";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem("blogUser"));
    if (localUserInfo) {
      dispatch(addUserInfo(localUserInfo));
      Cookies.set("token", localUserInfo.token);
      setUser(localUserInfo);
    }
  }, []);

  const inputValue = inputRef?.current?.value;

  const handleSearch = debounce(async (e) => {
    // router.push(`/?search=${e.target.value}`);
    setLoading(true);
    try {
      const { data } = await searchBlog(e.target.value);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, 400);

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
          ref={inputRef}
          onChange={(e) => {
            handleSearch(e);
          }}
          className=" outline-none w-full pr-3"
          placeholder="Search..."
        />
        {searchResult?.length > 0 && inputValue && (
          <div className="absolute top-16 overflow-scroll w-max max-h-32 shadow-lg bg-white rounded-md px-4 py-4 z-50">
            {searchResult?.length > 0 ? (
              searchResult?.map((blog) => {
                return (
                  <p
                    key={blog._id}
                    className="py-1 px-2 rounded-lg hover:bg-slate-400"
                  >
                    <Link href={`/post/${blog._id}`}>{blog.title}</Link>
                  </p>
                );
              })
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <p>Did not find any match.</p>
            )}
          </div>
        )}
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
              <Image
                height={30}
                width={30}
                src={user.image}
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
