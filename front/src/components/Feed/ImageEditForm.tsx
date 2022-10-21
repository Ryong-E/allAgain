import styled from "styled-components";
import { ImageType } from "../../types/feedTypes";
import { AddImageButton } from "../common/Buttons";
import UploadImageAlbum from "./UploadImageAlbum";

interface ImageEditFormProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  uploadImages: ImageType[];
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ImageEditForm({
  onChange,
  uploadImages,
  onDeleteClick,
}: ImageEditFormProps) {
  return (
    <>
      <ImageFormContainer>
        <AddImageButton as="label" htmlFor="multi-upload">
          사진 추가
        </AddImageButton>
        <input
          id="multi-upload"
          type="file"
          multiple
          hidden
          onChange={onChange}
          accept="image/*"
        />
      </ImageFormContainer>
      <ImageFormDescription>
        최대 업로드 파일 : 8개 / 각 파일 당 파일 크기 제한 : 5MB
      </ImageFormDescription>
      <UploadImageAlbum
        uploadImages={uploadImages}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
}

const ImageFormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImageFormDescription = styled.div`
  width: 100%;
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  align-items: center;
  text-align: right;
  color: #a9a9a9;
  margin: 30px 0;
`;

export default ImageEditForm;
