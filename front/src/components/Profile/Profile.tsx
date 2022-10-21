import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api/userApi";
import { DELETE_USER } from "../../constant/queryKeys";
import * as StyledProfile from "./Profile.style";
import ProfileForm from "./ProfileForm";
import ProfileImage from "./ProfileImage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { loggedInUserId, loggedInUserImgUrl } from "../../atoms/atoms";

export default function Profile() {

  const navigate = useNavigate();

  const loginUserId = useRecoilValue(loggedInUserId);
  const [userId, setUserId] = useState(loginUserId);

  const resetloggedInUserId = useResetRecoilState(loggedInUserId);
  const resetloggedInUserImgUrl = useResetRecoilState(loggedInUserImgUrl);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const deleteUserMutation = useMutation([DELETE_USER], deleteUser, {
    onError: (error: any, variable, context) => {
    },
    onSuccess: (data: any, variables, context) => {
      console.log("탈퇴성공");
      resetloggedInUserId();
      resetloggedInUserImgUrl();
      navigate(ROUTE.LANDING.link);
    },
  });

  const handleWithdrawal = () => {
    deleteUserMutation.mutate({ userId });
  };

  const [confirmBox, setConfirmBox] = useState(false);

  const handleCLick = () => {
    setConfirmBox(!confirmBox)
  }

  return (
    <>
      <ProfileImage />
      <ProfileForm />
      <StyledProfile.WithdrawalWrap>
        {
          confirmBox ? (
            <StyledProfile.WithdrawalConfirmBox>
              <p>회원탈퇴 시 모든 정보가 삭제되며, 복구되지 않습니다.</p>
              <p>탈퇴하시겠습니까?</p>
              <div>
                <StyledProfile.WithdrawalConfirmButton btnType={"cls"} onClick={handleCLick}>취소</StyledProfile.WithdrawalConfirmButton>
                <StyledProfile.WithdrawalConfirmButton btnType={"ok"} onClick={(handleWithdrawal)}>탈퇴신청</StyledProfile.WithdrawalConfirmButton>
              </div>
              </StyledProfile.WithdrawalConfirmBox>
          ) : (
            <StyledProfile.WithdrawalButton onClick={handleCLick}>회원탈퇴</StyledProfile.WithdrawalButton>
          )
        }
      </StyledProfile.WithdrawalWrap>
    </>
  )
};