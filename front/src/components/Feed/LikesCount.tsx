import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInUserId } from "../../atoms/atoms";
import { FeedLikeType } from "../../types/feedTypes";
import FeedLikeToggle from "./FeedLikeToggle";

interface likesCountProps {
  likeList: FeedLikeType[];
  feedId: number;
}

function LikesCount({ likeList, feedId }: likesCountProps) {
  const currentUserId = useRecoilValue(loggedInUserId);

  return (
    <Container>
      <FeedLikeToggle
        likeId={
          likeList &&
          likeList.find((like) => like.userId === currentUserId)?.likeId
        }
        isLiked={
          likeList &&
          typeof likeList.find((like) => like.userId === currentUserId) !==
            "undefined"
            ? true
            : false
        }
        feedId={feedId}
        userId={currentUserId}
        count={likeList ? likeList.length : 0}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
`;

export default LikesCount;
