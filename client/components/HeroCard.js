import { addSingleBlog } from "@/redux/blogSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const HeroCard = ({ blog }) => {
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => dispatch(addSingleBlog(blog))}
      href={`/post/${blog._id}`}
      className="card overflow-hidden w-96 shadow-xl"
    >
      {blog?.image && (
        <figure className="bg-black h-full">
          <Image
            height={250}
            width={300}
            src={blog.image}
            className="inset-0 object-cover h-full w-full opacity-60"
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
