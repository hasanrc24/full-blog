import Navbar from "@/components/Navbar";
import { getSingleBlog } from "@/config/axiosInstance";
import React from "react";

const PostSlug = ({ post }) => {
  console.log(post);
  return (
    <div>
      <Navbar />
      <p>{post?.title}</p>
    </div>
  );
};

export default PostSlug;

export const getServerSideProps = async ({ req, query }) => {
  const { data } = await getSingleBlog(query.postSlug);
  return {
    props: { post: data },
  };
};
