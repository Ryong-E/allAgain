import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getFeedByUserId, getFeedLikedByUserId } from "../../api/feedApi";
import { loggedInUserId } from "../../atoms/atoms";
import FeedAddButton from "../Feed/FeedAddButton";
import FeedList from "../Feed/FeedList";

interface UserFeedListProps {
  isLike: boolean;
  isMyDetail?: boolean;
  userId: string;
}

function UserFeedList({ isLike, isMyDetail, userId }: UserFeedListProps) {
  const currentUserId = useRecoilValue(loggedInUserId);

  const selectFetch = useCallback(() => {
    console.log("fetching");
    if (isLike) return getFeedLikedByUserId(currentUserId!);
    return getFeedByUserId(userId);
  }, [isLike, currentUserId, userId]);

  const { isSuccess, data } = useQuery([isLike], () => selectFetch());

  return (
    <ListContainer>
      <AddButtonContainer>
        {isMyDetail && (
          <AddPos>
            <FeedAddButton />
          </AddPos>
        )}
      </AddButtonContainer>

      {isSuccess && <FeedList feeds={data} isSimple={true} />}
    </ListContainer>
  );
}

UserFeedList.defaultProps = {
  isLike: false,
};

const ListContainer = styled.div`
  width: 100%;
`;

const AddButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;

const AddPos = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
`;

export default UserFeedList;
