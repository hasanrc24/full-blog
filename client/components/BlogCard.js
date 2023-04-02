import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <Link href="/" className="card w-72 bg-base-100 shadow-xl rounded-lg">
      <figure>
        <img src={blog.image} alt="blog-img" />
      </figure>
      <div className="card-body p-4">
        <h2 className="font-semibold">{blog.title}</h2>
        <p>{blog.body.slice(0, 40)}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
