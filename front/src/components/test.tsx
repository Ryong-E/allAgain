import { triggerAsyncId } from "async_hooks";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ImageUpload from "./feedGenerate/ImageUpload";
import TextEditor from "./feedGenerate/textEditor";
import parse from 'html-react-parser';

export default function Test(){
    const [editorContent,setEditorContent] = useState<string>("");
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger
    } = useForm();

    const onValid = (data : FieldValues) => {
        console.log(data.content)
    }

    const onChangeMyEdit = (content:string) => {
        setEditorContent(content)
        setValue('content',editorContent)
        trigger('content')
    }
    return (
        <div>
            <h1>테스트입니다</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit(onValid)}>
                <ImageUpload register={register} watch={watch}/>
                <TextEditor onChange={onChangeMyEdit} value={editorContent}/>
                <button type="submit">제출하기</button>
            </form>
            <div style={{padding:"30px"}}>{parse(editorContent)}</div>
        </div>
    )
}