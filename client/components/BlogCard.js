import Link from "next/link";
import React from "react";
import { FaRegComment } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  return (
    <Link href="/" className="card w-72 bg-base-100 shadow-xl rounded-lg">
      {blog?.image && (
        <figure>
          <img src={blog.image} alt="blog-img" />
        </figure>
      )}
      <div className="card-body p-3">
        <h2 className="font-semibold">{blog.title}</h2>
        <p>
          {blog.body.slice(0, 72)}
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
