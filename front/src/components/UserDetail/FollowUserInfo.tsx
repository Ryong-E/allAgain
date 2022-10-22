import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { deleteFollowUser, followUser } from "../../api/userApi";
import CheckedIcon from "../../assets/images/icons/icon_check_gr.png";
import { loggedInUserId } from "../../atoms/atoms";

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
  const currentUserId = useRecoilValue(loggedInUserId);
  const navigator = useNavigate();
  const { id } = useParams();

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
          navigator(`/user/${userId}`);
        }}>
        <UserProfileImg src={"http://" + imageUrl} />
        <UserProfileNickname>{nickname}</UserProfileNickname>
      </UserProfileBox>
      {isFollowing && currentUserId === parseInt(id!) && (
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
  margin: 10px 0;
`;
const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
`;
const UserProfileImg = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #e7e5e0;
  cursor: pointer;
`;
const UserProfileNickname = styled.div`
  width: 121px;
  height: 28px;
  font-size: 18px;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;
const FollowButton = styled.button<{ isActive?: boolean }>`
  position: relative;
  width: 116px;
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
      padding: 0 0 0 20px;
    `}

  &::before {
    display: ${({ isActive }) => (isActive ? "block" : "none")};
    position: absolute;
    content: "";
    top: 50%;
    left: 20px;
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
