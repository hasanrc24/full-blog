import { getTime } from "@/config/utils";
import React from "react";

const Comment = ({ comment }) => {
  const { author, createdAt, body } = comment;
  return (
    <div className="border-b pb-2">
      <div className="flex mx-4 mt-4">
        <img src={author.image} alt="author" className=" h-9 rounded-full" />
        <div className="mx-2">
          <span className="font-semibold">{author.name}</span>
          <br />
          <span className="text-[.7rem] absolute -mt-1">
            {getTime(createdAt)}
          </span>
        </div>
      </div>
      <div className="ml-14 mt-2">{body}</div>
    </div>
  );
};

export default Comment;
