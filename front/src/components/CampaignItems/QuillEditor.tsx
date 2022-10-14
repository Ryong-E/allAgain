import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

interface EditorProps {
  value?: string;
  handleEditorChange?: (content: string) => void;
  readStatus: boolean;
  editorContent?:string;
}
Quill.register('modules/blotFormatter', BlotFormatter);

export default function QuillEditor({
  readStatus,
  value,
  handleEditorChange,
  editorContent,
}: EditorProps) {
  const quillRef = useRef<ReactQuill>()

  function handleImage() {
    const formData = new FormData();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpg");
    input.click();
    
  }
  const modules = useMemo(() => {
    return {
      blotFormatter: {
      },
      toolbar: {
        container: [
          [{header:[1,2,3,4,false]}],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] },{background:[]}],
          [
            { list: "ordered" },
            { list: "bullet" },
          ],
          ["image"],
        ],
    }
    };
  }, []);
  // 위에서 설정한 모듈들 foramts을 설정한다
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "header",
    "image",
    "color",
    "background",
    "blockquote",
  ];
  return (
    <>
      <ReactQuill
        ref={(element)=>{if(element !== null){quillRef.current = element}}}
        modules={modules}
        formats={formats}
        readOnly={readStatus ? true : false}
        theme={readStatus ? 'bubble' : 'snow'}
        value={readStatus ? value : editorContent}
        onChange={handleEditorChange}
      />
    </>
  );
}
