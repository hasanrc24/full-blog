import Comment from "@/components/Comment";
import Navbar from "@/components/Navbar";
import { deleteBlog, getSingleBlog, postComment } from "@/config/axiosInstance";
import { getTime, serializeMarkdown } from "@/config/utils";
import { addComment, addSingleBlog, blogSelector } from "@/redux/blogSlice";
import { editBlog } from "@/redux/editBlogSlice";
import { userSelector } from "@/redux/userSlice";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PostSlug = ({ post, postBody }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const commentBody = watch("comment");

  const { title, image, author, createdAt, comments, _id } = post;

  const { user } = useSelector(userSelector);
  const { singleBlog } = useSelector(blogSelector);

  const handleEditBlog = () => {
    dispatch(editBlog(post));
    router.replace(`/createPost`);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(post._id);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    setLoading(true);

    try {
      const { data } = await postComment(commentBody, _id, user._id);
      dispatch(addComment(data));
      reset();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
                <div className="flex gap-2">
                  <button
                    onClick={handleEditBlog}
                    className="btn max-w-max btn-outline"
                  >
                    Edit
                  </button>
                  {/* <button className="btn max-w-max btn-outline rounded-md">
                    Delete
                  </button> */}
                  <label htmlFor="my-modal-3" className="btn btn-outline">
                    Delete
                  </label>
                </div>
              )}

              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold">
                    Are you sure you want to delete this blog?
                  </h3>
                  <label htmlFor="my-modal-3" className="btn mt-3">
                    No
                  </label>
                  <label
                    htmlFor="my-modal-3"
                    className="btn mt-3 ml-2"
                    onClick={handleDelete}
                  >
                    Yes
                  </label>
                </div>
              </div>
            </>
          </div>
          <div className="w-1/2">
            {image && <img src={image} alt="post image" className="" />}
          </div>
        </div>
        <div>
          <MDXRemote {...postBody} />
        </div>
        <div className="w-1/2 border-t my-4 border-gray-500">
          <p className="font-semibold mt-2">Comments:</p>
          {comments?.length ? (
            singleBlog?.comments ? (
              singleBlog?.comments?.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            ) : (
              comments?.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            )
          ) : (
            <div>No comments yet.</div>
          )}
          {Object.keys(user).length > 0 ? (
            <form onClick={handleSubmit(submitComment)} className="my-4">
              <div className="flex">
                <img src={user.image} className="h-8 rounded-full" />
                <textarea
                  rows={3}
                  // value={commentBody}
                  // onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Enter your comment here."
                  className="mx-3 w-full p-3 border-b-2 border-gray-400 focus:border-gray-600 outline-none"
                  {...register("comment", { required: true })}
                ></textarea>
                {errors.comment && (
                  <span className="text-xs">Please write something</span>
                )}
              </div>
              <button
                type="submit"
                className={`btn mt-4 rounded-lg float-right mb-4 mr-3 ${
                  loading && "btn-loading btn-disabled"
                }`}
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="mt-3">
              <Link href="/signIn" className="text-blue-600">
                Login
              </Link>{" "}
              to post a comment.
            </div>
          )}
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
