import Navbar from "@/components/Navbar";
import { getSingleBlog } from "@/config/axiosInstance";
import { getTime, serializeMarkdown } from "@/config/utils";
import { editBlog } from "@/redux/editBlogSlice";
import { userSelector } from "@/redux/userSlice";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PostSlug = ({ post, postBody }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { title, image, author, createdAt } = post;

  const { user } = useSelector(userSelector);

  const handleEditBlog = () => {
    dispatch(editBlog(post));
    router.replace(`/createPost`);
  };
  return (
    <>
      <Head>
        <title>Advanced Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="my-8">
        <div className="flex gap-8 mb-6">
          <div className="w-1/2 flex justify-center flex-col">
            <>
              <p className="font-semibold text-3xl">{title}</p>
              <div className="flex gap-2 my-4">
                <img
                  src={author.image}
                  alt="author"
                  className=" h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{author.name}</p>
                  <span className="text-[.7rem] absolute -mt-[4px] font-semibold">
                    {getTime(createdAt)}
                  </span>
                </div>
              </div>
              {(user.role === "admin" || author._id === user._id) && (
                <button
                  onClick={handleEditBlog}
                  className="btn max-w-max rounded-md text-white"
                >
                  Edit
                </button>
              )}
            </>
          </div>
          <div className="w-1/2">
            {image && <img src={image} alt="post image" className="" />}
          </div>
        </div>
        <div>
          <MDXRemote {...postBody} />
        </div>
      </div>
    </>
  );
};

export default PostSlug;

export const getServerSideProps = async ({ req, query }) => {
  const { data } = await getSingleBlog(query.postSlug);
  return {
    props: { post: data, postBody: await serializeMarkdown(data.body) },
  };
};
