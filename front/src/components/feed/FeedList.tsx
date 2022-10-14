import styled from "styled-components";
import { IFeed } from "../../types/feedTypes";
import Feed from "./Feed";

type FeedListProps = {
  feeds: IFeed[];
  isSimple: boolean;
};

function FeedList({ feeds, isSimple }: FeedListProps) {
  return (
    <FeedsContainer>
      {feeds.map((feed: IFeed) => (
        <Feed {...feed} isSimple={isSimple} />
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
