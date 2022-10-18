import { useForm } from "react-hook-form";
import * as StyledProfile from "./Profile.style";
import { useState, useEffect } from "react";
import { MyProfile } from "../../types/userTypes";
import { getUserProfile, updateUserImage } from "../../api/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_PROFILE, UPDATE_PROFILE_IMG } from "../../constant/queryKeys";
import { useRecoilValue } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";

interface Inputs {
  profileImage: File[],
}

export default function ProfileImage() {

  const loginUserId = useRecoilValue(loggedInUserId);
  const [userId, setUserId] = useState(loginUserId);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const [previewImage,setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<Inputs>();



  // 프로필 데이터 가져와서 프로필 이미지 보이기
  const queryClient = useQueryClient();
  
  useQuery<MyProfile, Error>([GET_PROFILE], getUserProfile, {
    refetchOnWindowFocus: true,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      const replaceUrl = data.imageUrl.replaceAll("\\", "/");
      setPreviewImage("http://" + replaceUrl);
    }
  });

  // 프로필 이미지 업로드 Mutation 정의
  const updateProfileImgMutation = useMutation([UPDATE_PROFILE_IMG], updateUserImage, {
    onError: (error: any, variable, context) => {
      console.log(error.data.errorMessage);
    },
    onSuccess: (data: any, variables, context) => {
      queryClient.invalidateQueries([GET_PROFILE]);
      console.log("success", data, variables, context);
    },
  });


  // 이미지 파일 업로드 시 바로바로 post요청보내서 프로필 이미지 수정
  const onSubmit = (data: any) => {

    const formData = new FormData();
    formData.append("image", data.profileImage[0]);

    console.log("data: ", data.profileImage[0]);

    updateProfileImgMutation.mutate({ userId, formData });

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
          imageUrl={previewImage}
        />
        <StyledProfile.EditImageButton htmlFor="imageUpload"/>
      </StyledProfile.ImageFormContainer>
    </StyledProfile.ProfileImageWrap>
  )
}