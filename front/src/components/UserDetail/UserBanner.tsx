import styled from "styled-components";
import FollowToggle from "../common/FollowToggle";

interface UserBannerProps {
  userId: string;
  imageUrl: string;
  nickname: string;
  isMyDetail?: boolean;
}

function UserBanner({
  userId,
  imageUrl,
  nickname,
  isMyDetail,
}: UserBannerProps) {
  return (
    <UserProfileContainer>
      <UserProfileImage src={imageUrl} />
      <UserNickname>{nickname}</UserNickname>
      {isMyDetail || <FollowToggle />}
      <UserInfoContainer>
        <UserInfo>게시물 128</UserInfo>
        <UserInfo>팔로워 1.1M</UserInfo>
        <UserInfo>팔로우 0</UserInfo>
      </UserInfoContainer>
    </UserProfileContainer>
  );
}

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfileImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  overflow: hidden;
`;

const UserNickname = styled.div`
  height: 28px;
  font-size: 28px;
  line-height: 28px;
  margin-top: 32px;
  margin-bottom: 28px;
  text-align: center;
  color: #000000;
`;

const UserInfoContainer = styled.div`
  margin-top: 50px;
  width: 712px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const UserInfo = styled.div`
  width: 200px;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

export default UserBanner;
