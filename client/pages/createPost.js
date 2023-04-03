import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [postBody, setpostBody] = useState("");
  return (
    <div>
      <Navbar />
      <div
        style={{ height: "calc(100vh - 72px)" }}
        className="mx-auto text-center"
      >
        <p className="font-semibold text-4xl mt-4 mb-8">Post a blog</p>
        <form className="h-full">
          <input
            type="text"
            placeholder="Blog Title"
            className="px-4 py-2 w-1/4 rounded-md focus:rounded-none border-b-2 outline-none focus:border-slate-700"
          />
          <ReactQuill theme="snow" value={postBody} onChange={setpostBody} />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
