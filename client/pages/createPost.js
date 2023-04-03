import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React, { useCallback, useRef, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const CreatePost = () => {
  const [postBody, setpostBody] = useState();

  const RichEditor = dynamic(() => import("../components/RichEditor"), {
    ssr: false,
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <div>
      <Navbar />
      <div className="mx-auto text-center">
        <p className="font-semibold text-4xl mt-4 mb-8">Post a blog</p>
        <form className="h-full">
          <input
            type="text"
            placeholder="Blog Title"
            className="px-4 py-2 mb-8 w-1/4 rounded-md focus:rounded-none border-b-2 outline-none focus:border-slate-700"
          />
          <RichEditor
            // postBody={postBody}
            // setpostBody={setpostBody}
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
