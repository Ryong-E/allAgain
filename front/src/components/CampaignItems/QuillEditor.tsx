import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { Delta as TypeDelta } from "quill";
import BlotFormatter, {
  ResizeAction,
  ImageSpec,
} from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { insertImage } from "../../api/campaignApi";
import styled from "styled-components";

const QuillBlock = styled.div`
  .ql-editor {
    text-align: center;
  }
  .ql-container{
    overflow:hidden;
    background-color:#ffffff;
  }
`;

interface EditorProps {
  handleEditorChange?: (content: string) => void;
  editorContent?: string;
  register:any;
}

Quill.register("modules/blotFormatter", BlotFormatter);

export default function QuillEditor({
  handleEditorChange,
  editorContent,
  register
}: EditorProps) {
  const quillRef = useRef<ReactQuill>();
  function handleImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpg");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await insertImage(formData);
        const IMG_URL = res.data.imageUrl;
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();
        editor?.insertEmbed(range?.index!, "image", `http://${IMG_URL}`);
        editor?.setSelection(range?.index! + 1, 0);
      } catch (err) {
        return "실패";
      }
    });
  }
  class CustomImageSpec extends ImageSpec {
    getActions() {
      return [ResizeAction];
    }
  }

  const modules = useMemo(() => {
    return {
      blotFormatter: {
        specs: [CustomImageSpec],
        overlay:{
          style:{
            border:'3px solid black'
          }
        },
        resize:{
          handleStyle:{
          }
        }
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image"],
        ],
        handlers: {
          image: handleImage,
        },
      },
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
    "calltoaction",
    "size",
    "width",
  ];
  return (
    <>
      <QuillBlock>
        <div className="text-editor" style={{height:"800px"}}>
          <ReactQuill
            {...register('content')}
            style={{ width: "100%", height: "100%",backgroundColor:"#ffffff" }}
            ref={(element) => {
              if (element !== null) {
                quillRef.current = element;
              }
            }}
            modules={modules}
            formats={formats}
            theme={"snow"}
            value={editorContent}
            onChange={handleEditorChange}
          />
        </div>
      </QuillBlock>
    </>
  );
}
