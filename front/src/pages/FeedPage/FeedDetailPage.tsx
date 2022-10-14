import { useParams } from "react-router-dom";
import Comments from "../../components/Comment/Comments";
import { Container, Container1200 } from "../../components/common/Containers";
import FeedDetail from "../../components/feed/FeedDetail";
import { IFeed } from "../../types/feedTypes";

function FeedDetailPage() {
  const { id } = useParams();

  return (
    <Container>
      <Container1200>
        {/* <FeedDetail {...test} /> */}
        <Comments />
      </Container1200>
    </Container>
  );
}

export default FeedDetailPage;
