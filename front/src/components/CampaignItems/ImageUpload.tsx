import { hover } from "@testing-library/user-event/dist/hover";
import { watch } from "fs";
import { useEffect, useState } from "react";
import { FieldValue, Resolver, UseFormProps } from "react-hook-form";
import styled from "styled-components";
import addImageIcon from "../../assets/images/icons/icon_image_add.png";
import ImageEdit from "../../assets/images/icons/icon_image_edit.png";

const UploadImageBox = styled.div`
  width: 360px;
  height: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4efe5;
`;
const UploadFile = styled.input`
  display: none;
`;
const UploadFileLabel = styled.label`
  // display:inline-block;
  // margin-bottom:10px;
  // padding:8px 15px;
  line-height: normal;
  border-radius: 5px;
  // background-color:#928b7a;
  color: white;
  cursor: pointer;
  // box-shadow: 1px 1px 5px rgba(0,0,0,0.6);
  position: relative;
  background: ${({ theme }) => theme.colors.darkBeige};
  width: 160px;
  padding: 12px 30px 12px 60px;
  transition: all 0.3s;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translate(0, -45%);
    width: 2em;
    height: 2em;
    background: url(${addImageIcon}) no-repeat 50% 50% / contain;
    transition: all 0.3s;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.brown};
  }

  &:hover:after {
    left: 50%;
    transform: translate(-50%, -45%);
  }
`;
const Text = styled.p`
  color: #a9a9a9;
  font-size: 10px;
  position: relative;
  top: 20px;
`;
const ReImageUploadLabel = styled.label`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  opacity: 0;
  cursor: pointer;
  font-size: 20px;
  background: url(${ImageEdit}) no-repeat 50% 50% / contain;
`;
const PreviewImageBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:hover div {
    filter: blur(8px);
  }
  &:hover label {
    opacity: 1;
  }
`;

const PreviewImage = styled.div<{ background: string }>`
  background-image: url(${(props: any) => props.background || ""});
  background-position: center center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`;

function ImageUpload({ register, watch, defaultvalue }: any) {
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (defaultvalue) {
      setPreviewImage(`http://${defaultvalue}`);
    }
  }, [defaultvalue]);

  const newPicture = watch("thumbnail");

  useEffect(() => {
    if (newPicture && newPicture.length > 0) {
      const file = newPicture[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [newPicture]);
  return (
    <>
      <UploadImageBox>
        <UploadFile
          name="image-file"
          type="file"
          accept="image/png, image/jpg"
          id="upload-file"
          {...register("thumbnail")}></UploadFile>
        {previewImage ? (
          <PreviewImageBox>
            <PreviewImage background={previewImage}></PreviewImage>
            <ReImageUploadLabel htmlFor="upload-file"></ReImageUploadLabel>
          </PreviewImageBox>
        ) : (
          <>
            <UploadFileLabel htmlFor="upload-file">사진 추가</UploadFileLabel>
            <Text>파일 크기 제한 :5MB</Text>
          </>
        )}
      </UploadImageBox>
    </>
  );
}

export default ImageUpload;
