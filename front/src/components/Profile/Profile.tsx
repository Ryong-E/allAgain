import * as ProfileStyle from "./Profile.style";
import { getUserProfile } from '../../api/userApi';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { MyProfile } from "../../api/types"
import { useRecoilValue } from "recoil";
import { myProfileState } from "../../atoms/atoms";


export default function Profile() {

  // const myProfileInfo = useRecoilState(myProfileState);

  const { 
    data, 
    isLoading, 
    isError, 
    error,
  } = useQuery<MyProfile, Error>(["myInfo"], getUserProfile, {
    staleTime: 5 * 1000,  // 5초간 fresh상태 유지 후 stale됨
    refetchOnMount: true,   // 
    refetchOnWindowFocus: true, // window에 포커스되면 refetch됨 
  });

  if(isError) {
    return <div>{error.message}</div>
  }

  // console.log(myProfileData);
  console.log(data && data);

  return (
    <>
    {
      !isLoading &&
      (
          <>
          <ProfileStyle.FormContainer>
            <ProfileStyle.Container400>
              <ProfileStyle.ImageWrap>
                <ProfileStyle.Image />
                <ProfileStyle.EditImageButton />
              </ProfileStyle.ImageWrap>
              <ProfileStyle.NickNameInput value={data.nickname}/>
            </ProfileStyle.Container400>
            <ProfileStyle.InfoListWrap>
              <ProfileStyle.InfoList>
                <li>
                  <span>이메일</span>
                  <p>{data.email}</p>
                </li>
                <li>
                  <span>이름</span>
                  <p>{data.name}</p>
                </li>
                <li>
                  <span>비밀번호</span>
                  <ProfileStyle.PwChangeBlock>
                    <ProfileStyle.PwChangeInput placeholder="현재 비밀번호"/>
                    <ProfileStyle.PwChangeInput placeholder="새 비밀번호"/>
                    <ProfileStyle.PwChangeInput placeholder="새 비밀번호 확인"/>
                  </ProfileStyle.PwChangeBlock>
                </li>
              </ProfileStyle.InfoList>
            </ProfileStyle.InfoListWrap>
            <ProfileStyle.SubmitButton>저장</ProfileStyle.SubmitButton>
          </ProfileStyle.FormContainer>
          <ProfileStyle.WithdrawalButton>회원탈퇴</ProfileStyle.WithdrawalButton>
        </>
      )
    }
    </>
  )
};