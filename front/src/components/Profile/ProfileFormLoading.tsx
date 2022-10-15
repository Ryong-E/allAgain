import styled from "styled-components";
import * as ProfileStyle from "./Profile.style";

const InfoListWrap = styled(ProfileStyle.InfoListWrap)`
  height: 400px;
`;

export default function ProfileFormLoading() {
  return (
    <div>
      <ProfileStyle.Container400>
        <ProfileStyle.NickNameInput />
      </ProfileStyle.Container400>
      <InfoListWrap />
    </div>
  )
}