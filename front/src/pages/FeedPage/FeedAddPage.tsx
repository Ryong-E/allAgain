import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  AddImageButton,
  CloseButton,
  ClsButton,
  ConfirmButton,
} from "../../components/common/Buttons";
import { Container, Container1200 } from "../../components/common/Containers";
import AuthorInfo from "../../components/feed/AuthorInfo";

interface FormValues {
  detail: string;
  tags: string;
}

function FeedAddPage() {
  const [imgPreview, setImgPreview] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const { register, handleSubmit } = useForm<FormValues>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let fileURLs: string[] = [];
    let filesArr: File[] = [];

    if (files) {
      if (files.length > 8) {
        alert("8개를 이하의 이미지만 업로드 가능합니다.");
        return;
      }
      Object.keys(files).forEach((key) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[parseInt(key)]);
        reader.onloadend = () => {
          fileURLs.push(reader.result as string);
          setImgPreview([...imgPreview, ...fileURLs]);
        };
        filesArr.push(files[parseInt(key)]);
        setUploadImages([...uploadImages, ...filesArr]);
      });
    }
    e.target.value = "";
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
    if (uploadImages.length !== 0) {
      const { detail, tags } = data;
      const tagsArr: string[] = tags.split("#").slice(1);
      const formData = new FormData();
      uploadImages.forEach((file) => formData.append("image", file));
    } else alert("파일 개수 미달");
  });

  return (
    <Container>
      <Container1200>
        <FormContainer
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}>
          <ImageFormContainer>
            <AddImageButton as="label" htmlFor="multi-upload">
              사진 추가
            </AddImageButton>
            <input
              id="multi-upload"
              type="file"
              multiple
              hidden
              onChange={handleOnChange}
            />
          </ImageFormContainer>
          <ImageFormDescription>
            최대 업로드 파일 : 8개 / 각 파일 당 파일 크기 제한 : 5MB
          </ImageFormDescription>
          <ImageAlbum>
            {imgPreview.length === 0 && (
              <ImageWarning>1개 이상의 사진을 추가해주세요</ImageWarning>
            )}
            {imgPreview.map((imageSrc, index) => (
              <ImageContainer key={index}>
                <ImageTest src={imageSrc} alt={imageSrc} key={index} />
                <ImageDelete value={index} onClick={handleDeleteClick} />
                {index === 0 && <ImageThumnailMark>썸네일</ImageThumnailMark>}
              </ImageContainer>
            ))}
          </ImageAlbum>
          <TextContainer>
            <DetailContainer>
              <DetailHeader>
                <AuthorInfo size="detail" userId={132132} />
              </DetailHeader>
              <DetailSection
                placeholder="내용 작성.."
                {...register("detail", {
                  required: "내용을 작성해 주세요.",
                  minLength: {
                    value: 4,
                    message: "내용은 최소 4글자 이상이여야 합니다.",
                  },
                })}></DetailSection>
            </DetailContainer>
            <DetailTagContainer>
              <DetailTag
                type="text"
                placeholder="#으로 구분하여 태그를 입력해 주세요.."
                {...register("tags", {
                  required: "최소 1개 이상의 태그가 필요합니다.",
                  validate: {
                    tagRule: (value) =>
                      value.toString().startsWith("#") ||
                      "태그는 반드시 #으로 시작하여야합니다.",
                  },
                })}
              />
            </DetailTagContainer>
          </TextContainer>
          <ButtonContainer>
            <ClsButton>취소</ClsButton>
            <ConfirmButton type="submit">완료</ConfirmButton>
          </ButtonContainer>
        </FormContainer>
      </Container1200>
    </Container>
  );
}
//검증조건 => 이미지는 최소 1개 이상, detail은 최소 4자 이상,
//tags는 무조건 #으로 시작하는 문자열이여야한다.

const FormContainer = styled.form`
  margin-top: 180px;
`;

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
    content: "내용 작성..";
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
