import { QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createFeed, updateFeed, uploadFeedImages } from "../../api/feedApi";
import { ClsButton, ConfirmButton } from "../common/Buttons";
import {
  FeedFormValues,
  FeedType,
  ImageType,
  ImageUrlType,
} from "../../types/feedTypes";
import CategorySelectForm from "./CategorySelectForm";
import DescriptionEditForm from "./DescriptionEditForm";
import ImageEditForm from "./ImageEditForm";
import TagEditForm from "./TagEditForm";
import { FEEDS } from "../../constant/queryKeys";
import { useRecoilValue } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";
import ErrorAlertModal from "../Modals/ErrorAlertModal";

interface FeedEditProps extends FeedType {
  isEditing: boolean;
}

function FeedEditForm({
  feedId,
  userId,
  category,
  tags,
  imageUrls,
  description,
  isEditing,
}: FeedEditProps) {
  const currentUserId = useRecoilValue(loggedInUserId);
  const [uploadImages, setUploadImages] = useState<ImageType[]>([]);
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FeedFormValues>({
    reValidateMode: "onSubmit",
  });
  const navigator = useNavigate();
  const queryClient = new QueryClient();

  const submitMutation = useMutation(isEditing ? updateFeed : createFeed, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([FEEDS]);
      isEditing ? navigator(`/feed/${feedId}`) : navigator(`/feed/${data}`);
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const FILES_LENGTH = files ? files.length : 0;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (files) {
      if (FILES_LENGTH > 8) {
        alert("8개 이하의 이미지만 업로드 가능합니다.");
        return;
      }
      const imageList: ImageType[] = [];
      Object.keys(files).forEach((key) => {
        if (files[parseInt(key)].size > MAX_FILE_SIZE) {
          alert("파일 크기가 5MB 이하여야합니다");
          throw new Error("파일 크기 초과");
        }
        const reader = new FileReader();
        reader.readAsDataURL(files[parseInt(key)]);
        const image: ImageType = {
          url: "",
          file: files[parseInt(key)],
        };
        reader.onload = () => {
          image.url = reader.result as string;
          imageList.push(image);
          if (FILES_LENGTH - 1 === parseInt(key))
            setUploadImages((prev) => [...prev, ...imageList]);
        };
      });
    }
    e.target.value = "";
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const index = parseInt((e.target as HTMLButtonElement).value);
    uploadImages.splice(index, 1);
    setUploadImages([...uploadImages]);
  };

  const handleGoBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator(-1);
  };

  useEffect(() => {
    if (isEditing) {
      if (currentUserId === null || currentUserId !== userId)
        navigator(`/feed/${feedId}`);
    }
  }, [currentUserId, navigator, userId, feedId, isEditing]);

  const handleFormSubmit = handleSubmit(async (data) => {
    if (uploadImages.length !== 0 || !uploadImages) {
      const { description, tags, category } = data;
      const formData = new FormData();
      uploadImages.forEach(
        ({ file }) => file && formData.append("image", file)
      );
      const newUploadImageUrls = await uploadFeedImages(formData);
      const uploadImageUrls = uploadImages
        .filter((image) => image.file === undefined)
        .concat(newUploadImageUrls);
      const submitData = {
        feedId,
        userId,
        description,
        tags: tags.slice(1).replaceAll("#", ","),
        imageUrls: uploadImageUrls as unknown as ImageUrlType[],
        category: typeof category !== "string" ? category.join() : category,
      };
      submitMutation.mutate(submitData);
    } else throw new Error("test");
  });

  useEffect(() => {
    setUploadImages(imageUrls);
  }, [imageUrls]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <ErrorAlertModal
        content={"이미지는 최소 1개 이상 업로드해주세요"}
        showModal={isImageError}
        setShowModal={setIsImageError}
      />
      <ImageEditForm
        onChange={handleOnChange}
        onDeleteClick={handleDeleteClick}
        uploadImages={uploadImages}
      />
      <TextContainer>
        <DescriptionEditForm
          userId={userId}
          register={register}
          description={description}
          errors={errors.description?.message}
        />
        <CategorySelectForm
          register={register}
          category={category}
          errors={errors.category?.message}
        />
        <TagEditForm
          register={register}
          tags={tags}
          errors={errors.tags?.message}
        />
      </TextContainer>
      <ButtonContainer>
        <ClsButton onClick={handleGoBackClick}>취소</ClsButton>
        <ConfirmButton
          onClick={() => {
            if (uploadImages.length === 0 && !isImageError)
              setIsImageError(true);
            else handleFormSubmit();
          }}>
          완료
        </ConfirmButton>
      </ButtonContainer>
    </form>
  );
}

FeedEditForm.defaultProps = {
  feedId: 0,
  userId: 0,
  category: "",
  tags: "",
  imageUrls: [],
  description: "",
  isEditing: false,
};

const TextContainer = styled.div`
  width: 1200px;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
`;

const ButtonContainer = styled.div`
  margin: 80px 0;
  display: flex;
  justify-content: center;
`;

export default FeedEditForm;
