import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getFeedList } from '../../api/feedApi';
import { Container, Container1300, PageTitle, PageWrap } from '../../components/common/Containers';
import FeedAddButton from '../../components/feed/FeedAddButton';
import FeedList from '../../components/feed/FeedList';
import FeedTagFilter from '../../components/feed/FeedTagFilter';

function FeedListPage() {
  const { isSuccess, data } = useQuery(['feeds'], getFeedList, {
    refetchOnWindowFocus: false,
  });

  return (
    <PageWrap>
      <PageTitle>다시, 다 사용하다</PageTitle>
      <Container>
        <Container1300>
          <FeedListOptionsContainer>
            <FeedTagFilter />
            <FeedAddButton />
          </FeedListOptionsContainer>
          {isSuccess && <FeedList feeds={data} isSimple={false} />}
        </Container1300>
      </Container>
    </PageWrap>

  );
}

const FeedListOptionsContainer = styled.div`
  width: 100%;
  margin-top: 174px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FeedListPage;
