import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api/userApi";
import { DELETE_USER } from "../../constant/queryKeys";
import * as ProfileStyle from "./Profile.style";
import ProfileForm from "./ProfileForm";
import ProfileImage from "./ProfileImage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";

export default function Profile() {

  const navigate = useNavigate();

  const deleteUserMutation = useMutation([DELETE_USER], deleteUser, {
    onError: (error: any, variable, context) => {
    },
    onSuccess: (data: any, variables, context) => {
      console.log("탈퇴성공");
      navigate(ROUTE.LANDING.link);
    },
  });

  const handleWithdrawal = () => {
    deleteUserMutation.mutate();
  };

  const [confirmBox, setConfirmBox] = useState(false);

  const handleCLick = () => {
    setConfirmBox(!confirmBox)
  }

  return (
    <>
      <ProfileImage />
      <ProfileForm />
      <ProfileStyle.WithdrawalWrap>
        {
          confirmBox ? (
            <ProfileStyle.WithdrawalConfirmBox>
              <p>회원탈퇴 시 모든 정보가 삭제되며, 복구되지 않습니다.</p>
              <p>탈퇴하시겠습니까?</p>
              <div>
                <ProfileStyle.WithdrawalConfirmButton btnType={"cls"} onClick={handleCLick}>취소</ProfileStyle.WithdrawalConfirmButton>
                <ProfileStyle.WithdrawalConfirmButton btnType={"ok"} onClick={(handleWithdrawal)}>탈퇴신청</ProfileStyle.WithdrawalConfirmButton>
              </div>
              </ProfileStyle.WithdrawalConfirmBox>
          ) : (
            <ProfileStyle.WithdrawalButton onClick={handleCLick}>회원탈퇴</ProfileStyle.WithdrawalButton>
          )
        }
      </ProfileStyle.WithdrawalWrap>
    </>
  )
};