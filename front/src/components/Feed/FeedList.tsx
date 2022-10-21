import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { FeedType } from "../../types/feedTypes";
import Feed from "./Feed";
import { followedUserIds } from "../../atoms/atoms";
import { useEffect } from "react";

type FeedListProps = {
  feeds: FeedType[];
  isSimple: boolean;
};

function FeedList({ feeds, isSimple }: FeedListProps) {
  // const setFollowedUsers = useSetRecoilState(followedUserIds);

  // useEffect(() => {
  //   console.log("recoil reset");
  //   setFollowedUsers([]);
  // }, [setFollowedUsers, feeds]);

  return (
    <FeedsContainer>
      {feeds.map((feed: FeedType) => {
        return (
          <Feed
            {...feed}
            isSimple={isSimple}
            key={`${feed.feedId}` + Date.now() + feed.userId}
          />
        );
      })}
    </FeedsContainer>
  );
}

const FeedsContainer = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export default FeedList;
