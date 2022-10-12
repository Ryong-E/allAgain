import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddImageButton } from '../../components/common/Buttons';
import { Container, Container1200 } from '../../components/common/Containers';

type testType = {
  [key: number]: string;
};

function FeedAddPage() {
  const [imgPreview, setImgPreview] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<Blob[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let fileURLs: string[] = [];
    let filesArr: Blob[] = [];

    if (files) {
      if (files.length > 8) {
        alert('8개를 이하의 이미지만 업로드 가능합니다.');
        return;
      }
      Object.keys(files).forEach((key) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[parseInt(key)]);
        reader.onloadend = () => {
          fileURLs.push(reader.result as string);
          filesArr.push(files[parseInt(key)]);
          setImgPreview([...imgPreview, ...fileURLs]);
          setUploadImages([...uploadImages, ...filesArr]);
        };
      });
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt((e.target as HTMLButtonElement).value);
    imgPreview.splice(index, 1);
    setImgPreview([...imgPreview]);
    uploadImages.splice(index, 1);
    setUploadImages([...uploadImages]);
  };

  useEffect(() => {
    console.log(uploadImages);
  }, [uploadImages]);

  return (
    <Container>
      <Container1200>
        <FormContainer encType='multipart/form-data'>
          <ImageFormContainer>
            <AddImageButton as='label' htmlFor='multi-upload'>
              사진 추가
            </AddImageButton>
            <input
              id='multi-upload'
              type='file'
              multiple
              hidden
              onChange={handleOnChange}
            />
          </ImageFormContainer>
          <ImageFormDescription>
            최대 업로드 파일 : 8개 / 각 파일 당 파일 크기 제한 : 5MB
          </ImageFormDescription>
          <ImageAlbum>
            {imgPreview.map((imageSrc, index) => (
              <ImageContainer key={index}>
                <ImageTest src={imageSrc} alt={imageSrc} key={index} />
                <ImageDelete value={index} onClick={handleDeleteClick}>
                  X
                </ImageDelete>
              </ImageContainer>
            ))}
          </ImageAlbum>
        </FormContainer>
      </Container1200>
    </Container>
  );
}

const FormContainer = styled.form`
  margin-top: 180px;
`;

const ImageFormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImageFormDescription = styled.div`
  width: 100%;
  font-family: 'Noto Sans';
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  align-items: center;
  text-align: right;
  color: #a9a9a9;
  margin: 30px 0;
`;

const ImageAlbum = styled.div`
  width: 1200px;
  height: 600px;
  background-color: #f3efe5;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
  display: flex;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ImageTest = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
`;

const ImageDelete = styled.button`
  position: absolute;
  right: 0%;
  top: 0%;
  border: 0;
  background-color: white;
  font-size: 20px;
`;
export default FeedAddPage;
