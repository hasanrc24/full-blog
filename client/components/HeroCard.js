import Link from "next/link";
import React from "react";

const HeroCard = ({ blog }) => {
  return (
    <Link
      href={`/post/${blog._id}`}
      className="card overflow-hidden w-96 shadow-xl"
    >
      {blog?.image && (
        <figure className="bg-black h-full">
          <img
            src={blog.image}
            className="inset-0 object-cover h-full opacity-60"
            alt="post-bg"
          />
        </figure>
      )}
      <div className="card-body absolute bottom-0">
        <h2 className="card-title text-white">{blog.title}</h2>
        {/* <h2 className="text-white">{blog.body.slice(0, 70)}</h2> */}
      </div>
    </Link>
  );
};

export default HeroCard;
