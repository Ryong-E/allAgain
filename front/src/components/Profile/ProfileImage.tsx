import { useForm } from "react-hook-form";
import * as StyledProfile from "./Profile.style";
import { useState, useEffect } from "react";
import { User } from "../../api/types";
import ProfileIcon from "../../assets/images/icons/icon_profile.png";
import { updateUserImage } from "../../api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UPDATE_PROFILE_IMG } from "../../constant/queryKeys";

interface Inputs {
  profileImage: File[],
}

export default function ProfileImage() {

  const [previewImage,setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  } = useForm<Inputs>();


  // 업로드한 이미지 미리보기
  const newPicture = watch("profileImage");

  useEffect(() => {
      if (newPicture && newPicture.length > 0) {
          const file = newPicture[0];
          setPreviewImage(URL.createObjectURL(file));
      }
  }, [newPicture]);


  // 프로필 이미지 업로드 Mutation 정의
  const queryClient = useQueryClient();

  const updateProfileImgMutation = useMutation([UPDATE_PROFILE_IMG], updateUserImage, {
    onError: (error: any, variable, context) => {
    },
    onSuccess: (data: any, variables, context) => {
      console.log("success", data, variables, context);
    },
  });


  // 이미지 파일 업로드 시 바로바로 post요청보내서 프로필 이미지 수정
  const onSubmit = (data: any) => {

    const formData = new FormData();
    formData.append("image", data.profileImage[0]);

    console.log(data.profileImage[0]);
    console.log(formData);

    updateProfileImgMutation.mutate({ formData });

  }


  return (
    <StyledProfile.ProfileImageWrap>
      <StyledProfile.ImageFormContainer onChange={handleSubmit(onSubmit)}>
        <StyledProfile.InputImage 
          {...register("profileImage")}
          type="file"
          name="profileImage"
          accept="image/png, image/jpg"
          id="imageUpload"
        />
        <StyledProfile.PreviewImage 
          image_url={previewImage ? previewImage : ProfileIcon}
        />
        <StyledProfile.EditImageButton htmlFor="imageUpload"/>
      </StyledProfile.ImageFormContainer>
    </StyledProfile.ProfileImageWrap>
  )
}