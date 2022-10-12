import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    value : string;
    onChange : (content : string) => void;
}


export default function TextEditor({value,onChange} : EditorProps){
    const quillRef = useRef<ReactQuill>();
    const [editorValue,setEditorValue] = useState<string>("");

    const handleImage = useCallback(()=>{
        {
            const input = document.createElement('input');
            input.setAttribute('type','file')
            input.setAttribute('accept','image/png,image/jpg');
            input.click();
    
            // input.addEventListener('change', async ()=>{
            //     const file = input.files;
            //     const form = new FormData()
            //     if(file !== null){
            //         form.append('image',file[0])
            //     }
            //     try{
            //         const result = await axios.post('aaa',form)
            //         console.log('성공',result.data.url)
            //         const IMG_URL = result.data.url
            //         const editor = quillRef.current?.getEditor();
            //         const range = editor?.getSelection();
            //         editor?.insertEmbed(range?.index!,'image',IMG_URL)
            //     }
            //     catch (errror){
            //         console.log('실패')
            //     }
    
            // })
    
            input.onchange = () => {
                if(input.files){
                    const newPicture = URL.createObjectURL(input!.files![0]);
                    console.log(newPicture);
                    const editor = quillRef.current?.getEditor();
                    const range = editor?.getSelection();
                    // editor!.insertEmbed(range?.index!,'image', newPicture)
                    editor?.clipboard.dangerouslyPasteHTML(range?.index!,`<img src=${newPicture} alt="image"/>`)
                }
            }
        }
    },[quillRef])

    const modules = useMemo(()=>({
        toolbar: {
            container: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
              [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
              ['image'], //video
              ['clean']  
            ],
            handlers:{
                image: handleImage
            },
        }
    }),[handleImage]);

    useEffect(()=>{
        console.log(editorValue)
    },[editorValue])

    return (
    <>
        <ReactQuill ref={(element) =>{if (element !== null){quillRef.current = element}}} modules={modules} value={value} onChange={onChange}/>
    </>
    )
}