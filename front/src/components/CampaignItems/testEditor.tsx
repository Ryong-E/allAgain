import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './testEditor.module.css';
import axios from 'axios';

interface EditorProps {
  value : string;
  handleEditorChange : (content : string) => void;
  readStatus:boolean;
}

export default function Editor({value,handleEditorChange,readStatus}:EditorProps){
  const { quill, quillRef, Quill } = useQuill({
    modules: {
      blotFormatter: {},
      toolbar:[
        [{header:[1,2,3,4,false]}],
        ['bold','italic','underline','strike','blockquote'],
        [{list:'ordered'},{list:'bullet'}],
        [{color:['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
        ['image'],
      ],
    },
    formats:['bold', 'italic', 'underline', 'strike','list','header','image','color', 'background','blockquote'],
    theme:readStatus ? "bubble" : "snow",
    readOnly:readStatus
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }
  async function handleImageUpload(){
    const formData = new FormData();
    const input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('accept','image/png, image/jpg');
    input.click();
    input.onchange = async () => {
      if(input.files !== null){
        formData.append('image',input.files[0]);
      }
      try{
        // const result = await axios.post('/',formData);
        // const IMAGE_URL = result.data.url;
        const newPicture : string = URL.createObjectURL(input!.files![0]).slice(5);
        console.log(newPicture)
        const range = quill?.getSelection();
        quill?.insertEmbed(range?.index!,'image', `${newPicture}`);
      }
      catch(err){
        console.log('실패');
      }
    }
  }
  // useEffect(()=>{
  //   if(quill){
  //     quill?.getModule('toolbar').addHandler('image',handleImageUpload);
  //   }
  // },[quill])

  function replaceHtml(html:string){
    let result = html.replaceAll('<','&lt;');
    result = result.replaceAll('>','&gt;');
    return result
  }

  // useEffect(()=>{
  //   if(quill){
  //     quill.on('text-change',(delta,oldDelta,source)=>{
  //       const content = quill.getContents();
  //       const converter = new QuillDeltaToHtmlConverter(content?.ops!,{
  //         inlineStyles: true
  //       });
  //       const html = converter.convert()
  //       const reHtml = replaceHtml(html);
  //       handleEditorChange(reHtml)
  //     })

  //   }
  // },[quill])
  return (
    <>
      <div ref={quillRef} style={{height:"500px"}}></div>
    </>
  );
};
