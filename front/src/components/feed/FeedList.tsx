import styled from 'styled-components';
import Feed from './Feed';

interface feed {
  user_id?: number;
  category?: string[];
  tags?: string[];
  image_urls?: string[];
  description?: string;
  feed_id?: number;
}

type FeedListProps = {
  feeds: feed[];
};

function FeedList({ feeds }: FeedListProps) {
  return (
    <FeedsContainer>
      {feeds.map((feed: feed) => (
        <Feed {...feed} />
      ))}
    </FeedsContainer>
  );
}

const FeedsContainer = styled.div`
  margin-top: 80px;
  width: 1350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default FeedList;
