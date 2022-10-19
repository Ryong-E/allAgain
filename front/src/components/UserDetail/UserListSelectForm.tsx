import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LikeListToggle from "../common/LikeListToggle";
import ListSelectTab from "./ListSelectTab";
import UserCampaignList from "./UserCampaignList";
import UserFeedList from "./UserFeedList";

interface UserListSelectFormProps {
  userId: string;
  isMyDetail?: boolean;
}

function UserListSelectForm({ userId, isMyDetail }: UserListSelectFormProps) {
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [isLike, setIsLike] = useState<boolean>(false);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLike(!isLike);
  };

  return (
    <UserListContainer>
      <UserLikeButtonContainer>
        {isMyDetail && <LikeListToggle />}
      </UserLikeButtonContainer>
      <ListSelectTab isActive={isSelected} setIsActive={setIsSelected} />
      {isSelected ? (
        <UserFeedList isLike={isLike} isMyDetail={isMyDetail} userId={userId} />
      ) : (
        <UserCampaignList
          isLike={isLike}
          isMyDetail={isMyDetail}
          userId={userId}
        />
      )}
    </UserListContainer>
  );
}

const UserListContainer = styled.div`
  width: 100%;
  min-height: 600px;
  padding: 47px 310px 100px;
`;

const UserLikeButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 42.5px;
  margin-bottom: 13px;
`;

export default UserListSelectForm;
