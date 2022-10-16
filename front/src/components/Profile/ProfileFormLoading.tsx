import styled from "styled-components";
import * as StyledProfile from "./Profile.style";

const InfoListWrap = styled(StyledProfile.InfoListWrap)`
  height: 400px;
`;

export default function ProfileFormLoading() {
  return (
    <div>
      <StyledProfile.Container400>
        <StyledProfile.NickNameInput />
      </StyledProfile.Container400>
      <InfoListWrap />
    </div>
  )
}