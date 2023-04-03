import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { postBlog } from "@/config/axiosInstance";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  // const [postBody, setpostBody] = useState();
  const [title, setTitle] = useState("");

  const RichEditor = dynamic(() => import("../components/RichEditor"), {
    ssr: false,
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await postBlog(title, body);
      setLoading(false);
      setTitle("");
      setEditorState(() => EditorState.createEmpty());
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mx-auto text-center mb-6">
        <p className="font-semibold text-4xl mt-4 mb-8">Post a blog</p>
        <form onSubmit={handleSubmit} className="h-full">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 mb-8 w-2/4 rounded-md focus:rounded-none border-b-2 outline-none focus:border-slate-700"
          />
          <RichEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs my-4 rounded-md"
          />
          <br />
          <button
            type="submit"
            className={`btn ${
              loading && "loading btn-disabled"
            } text-white rounded-md`}
          >
            Post blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
