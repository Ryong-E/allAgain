import { watch } from "fs";
import { useEffect, useState } from "react";
import { FieldValue, Resolver, UseFormProps } from "react-hook-form";
import styled from "styled-components";

const UploadImageBox = styled.div`
    width:250px;
    height:140px;
    background-color:red;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:#f4efe5;
`
const UploadFile = styled.input`
    display:none;
`
const UploadFileLabel = styled.label`
    display:inline-block;
    margin-bottom:10px;
    padding:8px 15px;
    line-height:normal;
    border-radius:3px;
    background-color:#928b7a;
    color:white;
    cursor:pointer;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.6);
`
const Text = styled.p`
    color:#A9A9A9;
    font-size:10px;
`
const Img = styled.div<{background : string}>`
    background-image: url(${(props:any) => props.background || ""});
    background-position:center center;
    background-size:100% 100%;
    width:100%;
    height:100%;
`
// interface FormValue {
//     image:File[];
// }

function ImageUpload({register,watch} : any){
    const [previewImage,setPreviewImage] = useState("")

    const newPicture = watch("image");

    useEffect(() => {
        if (newPicture && newPicture.length > 0) {
            const file = newPicture[0];
            setPreviewImage(URL.createObjectURL(file));
        }
    }, [newPicture]);
    return (
        <>
            <UploadImageBox>
                <UploadFile name="image-file" type="file" accept="image/png, image/jpg" id="upload-file"  {...register('image')}></UploadFile>
                {previewImage ? <Img background={previewImage}></Img> : <><UploadFileLabel htmlFor="upload-file">사진 추가</UploadFileLabel><Text>
                파일 크기 제한 :5MB
                </Text></>}
            </UploadImageBox>
        </>
    );
}

export default ImageUpload;