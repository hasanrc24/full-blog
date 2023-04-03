// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichEditor = ({ editorState, setEditorState }) => {
  //   const [editorState, setEditorState] = useState(() =>
  //     EditorState.createEmpty()
  //   );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  //   setpostBody(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </>
  );
};

export default RichEditor;
