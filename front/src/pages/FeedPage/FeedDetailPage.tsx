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
    [FEED_DETAIL, id],
    () => getFeed(parseInt(id!)),
    {
      refetchOnWindowFocus: false,
      onError: () => navigator(-1),
    }
  );

  if (!isSuccess) {
    return <></>;
  }

  return (
    <Container>
      <Container1200>
        <FeedDetail {...data} />
        {<Comments comments={data.comments!} />}
      </Container1200>
    </Container>
  );
}

export default FeedDetailPage;
