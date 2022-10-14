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
  feeds: IFeed[];
  isSimple: boolean;
};

interface IFeed {
  feedId: number;
  userId: number;
  category: string;
  tags: string;
  imageUrls: string[];
  description: string;
}

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
