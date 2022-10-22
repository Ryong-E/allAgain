import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFeed } from "../../api/feedApi";
import { Container, Container1200 } from "../../components/common/Containers";
import FeedEditForm from "../../components/Feed/FeedEditForm";
import { FEED_DETAIL } from "../../constant/queryKeys";

function FeedEditPage() {
  const { id } = useParams();
  const { data } = useQuery([FEED_DETAIL], () => getFeed(parseInt(id!)), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <Container>
      <Container1200>
        {data && <FeedEditForm {...data} isEditing={true} />}
      </Container1200>
    </Container>
  );
}

export default FeedEditPage;
