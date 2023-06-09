import { addSingleBlog } from "@/redux/blogSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";

const BlogCard = ({ blog }) => {
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => dispatch(addSingleBlog(blog))}
      href={`/post/${blog._id}`}
      className="card h-max overflow-hidden bg-base-100 shadow-xl rounded-lg"
    >
      {blog?.image && (
        <figure>
          <Image
            width={300}
            height={250}
            className="w-full"
            src={blog.image}
            alt="blog-img"
          />
        </figure>
      )}
      <div className="card-body p-3">
        <h2 className="font-semibold">{blog.title}</h2>
        <p className="">
          {blog.body.slice(0, 65)}
          {"..."}
        </p>
        <span className="flex text-xs items-center gap-1">
          {blog?.comments?.length}
          <FaRegComment />
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
