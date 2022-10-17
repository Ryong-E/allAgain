import styled from "styled-components";
import { FeedType } from "../../types/feedTypes";
import Feed from "./Feed";

type FeedListProps = {
  feeds: FeedType[];
  isSimple: boolean;
};

function FeedList({ feeds, isSimple }: FeedListProps) {
  return (
    <FeedsContainer>
      {feeds.map((feed: FeedType) => (
        <Feed {...feed} isSimple={isSimple} key={feed.feedId} />
      ))}
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
