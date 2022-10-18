import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getFeed } from "../../api/feedApi";
import Comments from "../../components/Comment/Comments";
import { Container, Container1200 } from "../../components/common/Containers";
import FeedDetail from "../../components/Feed/FeedDetail";
import { FEED_DETAIL } from "../../constant/queryKeys";

function FeedDetailPage() {
  const { id } = useParams();
  const navigator = useNavigate();

  const { isSuccess, data } = useQuery(
    [FEED_DETAIL],
    () => getFeed(parseInt(id!)),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!isSuccess) {
    navigator(-1);
    return <></>;
  }

  return (
    <Container>
      <Container1200>
        <FeedDetail {...data} />
        <Comments />
      </Container1200>
    </Container>
  );
}

export default FeedDetailPage;
