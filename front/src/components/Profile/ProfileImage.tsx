import * as StyledProfile from "./Profile.style";
import { useState, useEffect, useRef } from "react";
import { MyProfile } from "../../types/userTypes";
import { getUserProfile, updateUserImage } from "../../api/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_PROFILE, UPDATE_PROFILE_IMG } from "../../constant/queryKeys";
import { useRecoilValue } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import useDidMountEffect from "../../utils/useDidMountEffect";

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
  const [originalImage, setOriginalImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [imageBlob, setImageBlob] = useState<any>();
  const [cropModal, setCropModal] = useState(false);



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
      alert("프로필 이미지가 수정되었습니다.");
      queryClient.invalidateQueries([GET_PROFILE]);
      console.log("success", data, variables, context);
    },
  });


  // 이미지 파일 업로드 요청
  const onSubmit = () => {
    setCropModal(false);

    const formData = new FormData();
    formData.append("image", imageBlob);
    // console.log("data: ", data.profileImage[0]);
    updateProfileImgMutation.mutate({ userId, formData });
  }

  // 이미지 파일 선택 시
  const onChange = (e: any) => {
    e.preventDefault();

    setCropModal(true);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };


  // 이미지 크롭 후 완료 버튼 클릭 시
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());

      cropper.getCroppedCanvas().toBlob((blob: Blob | null) => {
        console.log(blob);
        setImageBlob(blob);
      }, "image/png", 0.95);
    }
  };

  useDidMountEffect(onSubmit, [imageBlob]);



  return (
    <StyledProfile.ProfileImageWrap>
      <StyledProfile.ImageFormContainer>
        <StyledProfile.InputImage type="file" name="profileImage" accept="image/*" id="imageUpload" onChange={ onChange }/>
        <StyledProfile.PreviewImage imageUrl={previewImage} />
        <StyledProfile.EditImageButton htmlFor="imageUpload"/>
      </StyledProfile.ImageFormContainer>
      {
        cropModal && (
          <StyledProfile.CropperModelWrap>
           <Cropper
              style={{ width: "100%", height: 500, margin: "0 auto" }}
              wheelZoomRatio={0.1}
              aspectRatio={1}
              src={originalImage}
              viewMode={1}
              minCropBoxHeight={80}
              minCropBoxWidth={80}
              background={false}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            <div className="button-wrap">
              <button className="cls-btn" onClick={() => { setCropModal(false); cropper.reset(); }}>취소</button>
              <button className="ok-btn" onClick={getCropData}>완료</button>
            </div>
            <img className="crop-preview" src={cropData} />
          </StyledProfile.CropperModelWrap>
        )
      }

    </StyledProfile.ProfileImageWrap>
  )
}