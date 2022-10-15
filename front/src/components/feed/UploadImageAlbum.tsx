import styled from "styled-components";
import { ImageType } from "../../types/feedTypes";
import { CloseButton } from "../common/Buttons";

interface UploadImageAlbumProps {
  uploadImages: ImageType[];
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
}

function UploadImageAlbum({
  uploadImages,
  onDeleteClick,
}: UploadImageAlbumProps) {
  return (
    <ImageAlbum>
      {uploadImages.length === 0 && (
        <ImageWarning>1개 이상의 사진을 추가해주세요</ImageWarning>
      )}
      {uploadImages.map(({ url }, index) => (
        <ImageContainer key={index}>
          <ImageTest src={url} alt={url} key={index} />
          <ImageDelete value={index} onClick={onDeleteClick} />
          {index === 0 && <ImageThumnailMark>썸네일</ImageThumnailMark>}
        </ImageContainer>
      ))}
    </ImageAlbum>
  );
}

const ImageAlbum = styled.div`
  width: 1200px;
  height: 600px;
  background-color: #f3efe5;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;

const ImageTest = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const ImageDelete = styled(CloseButton)`
  position: absolute;
  right: 0%;
  top: 0%;
  margin-right: 10px;
  margin-top: 10px;
`;

const ImageThumnailMark = styled.div`
  position: absolute;
  color: #ffffff;
  width: 74px;
  height: 31px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 29px;
  margin: 14px 0px 0px 14px;
  top: 0%;
  left: 0%;
  background-color: #4279f5;
`;

const ImageWarning = styled.div`
  margin: auto;
  font-weight: 400;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  color: #a9a9a9;
`;

export default UploadImageAlbum;
