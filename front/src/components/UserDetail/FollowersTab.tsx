import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FollowUser, FollowUserRes } from "../../types/userTypes";
import FollowUserInfo from "./FollowUserInfo";

interface FollowersTabProps {
  selected: boolean;
  followees: FollowUserRes;
  followers: FollowUserRes;
  removeFunction: () => void;
}

function FollowersTab({
  selected,
  followees,
  followers,
  removeFunction,
}: FollowersTabProps) {
  const [isSelect, setIsSelect] = useState<boolean>(true);
  const queryClient = useQueryClient();
  const { id } = useParams();

  useEffect(() => {
    setIsSelect(selected);
  }, [selected]);

  return (
    <FollowModalBack>
      <FollowListContainer>
        <FollowListButtonTab>
          <FollowListButton
            onClick={() => setIsSelect(true)}
            isActive={isSelect}>
            팔로워 {followers.count}
          </FollowListButton>
          <FollowListButton
            onClick={() => setIsSelect(false)}
            isActive={!isSelect}>
            팔로잉 {followees.count}
          </FollowListButton>
        </FollowListButtonTab>
        <FollowListBox>
          {isSelect
            ? followers.users.map((props: FollowUser) => (
                <FollowUserInfo {...props} key={props.userId} />
              ))
            : followees.users.map((props: FollowUser) => (
                <FollowUserInfo
                  {...props}
                  isFollowing={true}
                  key={props.userId}
                />
              ))}
        </FollowListBox>
      </FollowListContainer>
      <FollowModalDisableDiv
        onClick={() => {
          queryClient.invalidateQueries(["userProfile", id]);
          removeFunction();
        }}
      />
    </FollowModalBack>
  );
}

const BackFadeIn = keyframes`
0% {
  opacity: 0;
}
33% {
  opacity: 0.5;
}
100% {
  opacity: 1;
}
`;

const FollowModalBack = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  left: 0;
  top: 0;
  animation: ${BackFadeIn} ease-out 0.3s;
`;

const FollowModalDisableDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
`;

const BoxSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px)
  }
  33% {
    opacity: 0.5;
    transform: translateY(15px)
  }
  100% {
    opacity: 1;
    transform: translateY(0px)
  }
`;

const FollowListContainer = styled.div`
  margin: auto;
  padding: 38px 30px;
  width: 100%;
  max-width: 560px;
  height: 700px;
  background: #f9f7f2;
  box-shadow: 10px 10px 15px rgba(162, 190, 231, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  animation: ${BoxSlideIn} ease-out 0.3s;
  z-index: 10000;
`;

const FollowListButtonTab = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const FollowListButton = styled.div<{ isActive?: boolean }>`
  width: 50%;
  height: 100%;
  border-bottom: ${({ isActive }) => isActive && "3px solid #004D49"};
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  align-items: center;
  text-align: center;
`;

const FollowListBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
`;

export default FollowersTab;
