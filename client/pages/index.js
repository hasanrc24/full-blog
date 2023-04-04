import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import HeroCard from "@/components/HeroCard";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addUserInfo } from "@/redux/userSlice";
import { getAllBlogs } from "@/config/axiosInstance";
import { addBlogs } from "@/redux/blogSlice";
import { wrapper } from "@/redux/store";
import BlogCard from "@/components/BlogCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
  // const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // const localUserInfo = JSON.parse(localStorage.getItem("blogUser"));
    // if (localUserInfo) {
    //   dispatch(addUserInfo(localUserInfo));
    //   setUser(localUserInfo);
    dispatch(addBlogs(blogs));
    // }
  }, []);

  const handleClick = (title) => {
    console.log(title);
  };

  return (
    <>
      <Head>
        <title>Advanced Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Navbar />
        <div className="flex flex-col md:flex-row gap-8 justify-center my-6 pb-6 border-b">
          {blogs?.slice(0, 2).map((blog) => {
            return (
              <HeroCard
                key={blog._id}
                blog={blog}
                onClick={() => handleClick(blog.title)}
              />
            );
          })}
        </div>
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 grid-auto-rows-min">
          {blogs?.slice(2).map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  // if (!req.headers.cookie) {
  //   return {
  //     redirect: {
  //       destination: "/signIn",
  //     },
  //   };
  // }
  const { data } = await getAllBlogs();
  return {
    props: { blogs: data },
  };
};
