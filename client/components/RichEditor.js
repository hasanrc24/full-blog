import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichEditor = ({ editorState, setEditorState }) => {
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
    </>
  );
};

export default RichEditor;
