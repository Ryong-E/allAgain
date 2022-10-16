import { Container, Container1200 } from "../../components/common/Containers";
import FeedEditForm from "../../components/feed/FeedEditForm";

function FeedAddPage() {
  return (
    <Container>
      <Container1200>
        <FeedEditForm isEditing={false} />
      </Container1200>
    </Container>
  );
}

export default FeedAddPage;
