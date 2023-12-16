import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = ({ initialValue, onEditorChange }) => {
    const [editorValue, setEditorValue] = useState(initialValue);
  
    const handleChange = (value) => {
      setEditorValue(value);
      
      // Gọi hàm callback để truyền giá trị về component cha
      onEditorChange(value);
    };
  
    return (
      <ReactQuill value={editorValue} onChange={handleChange} />
    );
  };
  

export default MyEditor;
