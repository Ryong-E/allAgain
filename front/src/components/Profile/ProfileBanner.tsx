import * as StyledProfile from "./Profile.style";

interface ProfileBannerProps {
  imageUrl: string;
  nickname: string;
}

function ProfileBanner({ imageUrl, nickname }: ProfileBannerProps) {
  return (
    <>
      <StyledProfile.ProfileImageWrap>
        <StyledProfile.ImageFormContainer>
          <StyledProfile.PreviewImage imageUrl={imageUrl} />
          <StyledProfile.NicknameContainer>
            {nickname}
          </StyledProfile.NicknameContainer>
        </StyledProfile.ImageFormContainer>
      </StyledProfile.ProfileImageWrap>
    </>
  );
}

export default ProfileBanner;
