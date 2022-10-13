import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  AddImageButton,
  ClsButton,
  ConfirmButton,
} from '../../components/common/Buttons';
import { Container, Container1200 } from '../../components/common/Containers';
import AuthorInfo from '../../components/feed/AuthorInfo';

interface FormValues {
  detail: string;
  tags: string;
}

function FeedAddPage() {
  const [imgPreview, setImgPreview] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<Blob[]>([]);
  const { register, handleSubmit } = useForm<FormValues>();

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
    e.target.value = '';
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const index = parseInt((e.target as HTMLButtonElement).value);
    imgPreview.splice(index, 1);
    uploadImages.splice(index, 1);
    setImgPreview([...imgPreview]);
    setUploadImages([...uploadImages]);
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    console.log(JSON.stringify(data));
  });

  return (
    <Container>
      <Container1200>
        <FormContainer
          encType='multipart/form-data'
          onSubmit={handleFormSubmit}>
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
          <TextContainer>
            <DetailContainer>
              <DetailHeader>
                <AuthorInfo size='detail' user_id={132132} />
              </DetailHeader>
              <DetailSection
                placeholder='내용 작성..'
                {...register('detail')}></DetailSection>
            </DetailContainer>
            <DetailTagContainer>
              <DetailTag
                type='text'
                placeholder='#으로 구분하여 태그를 입력해 주세요..'
                {...register('tags')}
              />
            </DetailTagContainer>
          </TextContainer>
          <ButtonContainer>
            <ClsButton>취소</ClsButton>
            <ConfirmButton type='submit'>완료</ConfirmButton>
          </ButtonContainer>
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

const ImageDelete = styled.button`
  position: absolute;
  right: 0%;
  top: 0%;
  border: 0;
  background-color: white;
  font-size: 20px;
`;

const TextContainer = styled.div`
  width: 1200px;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
`;

const DetailContainer = styled.div`
  width: 1200px;
  padding: 40px 60px;
  background-color: #ffffff;
`;

const DetailHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const DetailSection = styled.textarea`
  margin-top: 25px;
  width: 100%;
  min-height: 131px;
  font-size: 15px;
  line-height: 36px;
  &:empty:before {
    content: '내용 작성..';
    color: #a9a9a9;
  }
  &:focus {
    outline: none;
  }
  border: 0;
`;

const DetailTagContainer = styled.div`
  width: 1200px;
  padding: 14px 45px 14px 45px;
  min-height: 49px;
  background-color: #004d49;
  display: flex;
  margin-bottom: 43px;
`;

const DetailTag = styled.input`
  color: #ffffff;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  width: 100%;
  text-align: left;
  margin-right: 15px;
  &:last-child {
    margin-right: 0px;
  }
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  margin: 80px 0;
  display: flex;
  justify-content: center;
`;
export default FeedAddPage;
