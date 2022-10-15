import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { insertImage } from "../../api/campaignApi";

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
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpg");
    input.click();
    input.addEventListener('change', async ()=>{
        console.log('온체인지');
        const file = input.files![0];
        console.log(file)
        const formData = new FormData();
        formData.append('image',file);
        try{
            const res = await insertImage(formData);
            // const res = await axios.post("http://localhost:5001/campaigns/images",formData,{headers:{
            //     "Content-Type":'multipart/form-data',
            //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJpYXQiOjE2NjU3MTQyMDB9.CAPudY_kZD6HmwiZgwIfbL9ov4lxvWOOf7QtU38wHf8',
            // }})
            console.log('성공데이터',res);
            const IMG_URL = res.data.imageUrl;
            console.log(IMG_URL,'주소');
            // const res = await insertImage()
            // let url = res.data.url;/

            const editor = quillRef.current?.getEditor();
            const range = editor?.getSelection();
            
            editor?.insertEmbed(range?.index!,'image',`http://${IMG_URL}`);
            editor?.setSelection(range?.index!+1,0);

        }
        catch(err){
            return('실패')
        }
    })
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
      handlers:{
        image:handleImage
      }
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
