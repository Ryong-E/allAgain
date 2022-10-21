import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getFeedByUserId, getFeedLikedByUserId } from "../../api/feedApi";
import { loggedInUserId } from "../../atoms/atoms";
import FeedAddButton from "../Feed/FeedAddButton";
import FeedList from "../Feed/FeedList";
import FeedIcon from "../../assets/images/icons/icon_feed_bei.png";

interface UserFeedListProps {
  isLike: boolean;
  isMyDetail?: boolean;
  userId: string;
}

function UserFeedList({ isLike, isMyDetail, userId }: UserFeedListProps) {
  const currentUserId = useRecoilValue(loggedInUserId);

  const selectFetch = useCallback(() => {
    if (isLike) return getFeedLikedByUserId(currentUserId!);
    return getFeedByUserId(userId);
  }, [isLike, currentUserId, userId]);

  const { isSuccess, data } = useQuery([isLike, "feedIsLike", userId], () =>
    selectFetch()
  );

  return (
    <ListContainer>
      <AddButtonContainer>
        {isMyDetail && (
          <AddPos>
            <FeedAddButton />
          </AddPos>
        )}
      </AddButtonContainer>

      {isSuccess && data.length !== 0 ? (
        <FeedList feeds={data} isSimple={true} />
      ) : (
        <NullContainer>
          <NullIcon />
          <NullContent>등록한 피드가 없습니다</NullContent>
        </NullContainer>
      )}
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

const NullContainer = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const NullIcon = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(${FeedIcon});
  background-size: cover;
`;
const NullContent = styled.div`
  margin-top: 20px;
  font-weight: 500;
  font-size: 24px;
  color: rgba(191, 177, 168, 0.5);
`;

export default UserFeedList;
