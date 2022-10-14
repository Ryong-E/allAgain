import * as ProfileStyle from "./Profile.style";
import { getUserProfile } from '../../api/userApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";

interface ProfileProps {
  bgUrl: string,
  nickname: string,
  email: string,
  name: string,
}

export default function Profile() {

  // const data = getUserProfile({ nickname: "소히" });
  // console.log(data);


  const { isLoading, error, data, isFetching } = useQuery(["userInfo"], () =>
    getUserProfile({ nickname: "소히" })
  );

  const userInfo = data && data;

  console.log(data && data);


  // const imageUrl: string = data.image_url;
  // console.log(imageUrl);

  return (
    <>
      <ProfileStyle.FormContainer>
        <ProfileStyle.Container400>
          <ProfileStyle.ImageWrap>
            <ProfileStyle.Image />
            <ProfileStyle.EditImageButton />
          </ProfileStyle.ImageWrap>
          <ProfileStyle.NickNameInput value="소히히히히히히"/>
        </ProfileStyle.Container400>
        <ProfileStyle.InfoListWrap>
          <ProfileStyle.InfoList>
            <li>
              <span>이메일</span>
              <p>test@naver.com</p>
            </li>
            <li>
              <span>이름</span>
              <p>정소희</p>
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
};