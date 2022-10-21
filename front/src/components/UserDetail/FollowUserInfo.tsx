import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { deleteFollowUser, followUser } from "../../api/userApi";
import CheckedIcon from "../../assets/images/icons/icon_check_gr.png";

interface FollowUserInfoProps {
  userId: number;
  nickname: string;
  imageUrl: string;
  isFollowing: boolean;
}

function FollowUserInfo({
  userId,
  nickname,
  imageUrl,
  isFollowing,
}: FollowUserInfoProps) {
  const [followStatus, setFollowStatus] = useState<boolean>(true);
  const navigator = useNavigate();

  const createFollow = useMutation(() => followUser(userId!));
  const deleteFollow = useMutation(() => deleteFollowUser(userId!));

  const handleFollowClick = () => {
    if (sessionStorage.getItem("jwtToken") !== null) {
      if (createFollow.isLoading || deleteFollow.isLoading) return;
      if (followStatus) {
        deleteFollow.mutate();
        setFollowStatus(false);
      } else {
        createFollow.mutate();
        setFollowStatus(true);
      }
    }
  };

  return (
    <UserContainer>
      <UserProfileBox
        onClick={() => {
          alert(userId);
          navigator(`/user/${userId}`);
        }}>
        <UserProfileImg src={"http://" + imageUrl} />
        <UserProfileNickname>{nickname}</UserProfileNickname>
      </UserProfileBox>
      {isFollowing && (
        <FollowButton onClick={handleFollowClick} isActive={followStatus}>
          팔로우
        </FollowButton>
      )}
    </UserContainer>
  );
}

const UserContainer = styled.div`
  padding: 11px 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
`;
const UserProfileImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 30px;
`;
const UserProfileNickname = styled.div`
  width: 121px;
  height: 28px;
  font-size: 20px;
  align-items: center;
  text-align: center;
`;
const FollowButton = styled.button<{ isActive?: boolean }>`
  position: relative;
  width: 126px;
  height: 36px;
  border-radius: 5px;
  font-weight: 700;
  text-align: center;
  align-items: center;
  line-height: 32px;
  font-size: 16px;
  border: 1px solid #004d49;
  padding: 0;

  background: #004d49;
  color: #ffffff;

  ${({ isActive }) =>
    isActive &&
    css`
      background: transparent;
      color: #004d49;
      padding: 0 0 0 14px;
    `}

  &::before {
    display: ${({ isActive }) => (isActive ? "block" : "none")};
    position: absolute;
    content: "";
    top: 50%;
    left: 25px;
    transform: translate(0, -50%);
    width: 0.9em;
    height: 0.9em;
    background: url(${CheckedIcon}) no-repeat 50% 50% / contain;
    transition: all 0.3s;
  }
  transition: all 0.3s;
`;

FollowUserInfo.defaultProps = {
  isFollowing: false,
};

export default FollowUserInfo;
