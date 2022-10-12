import { useParams } from 'react-router-dom';
import Comments from '../../components/Comment/Comments';
import { Container, Container1200 } from '../../components/common/Containers';
import Album from '../../components/feed/Album';
import FeedDetail from '../../components/feed/FeedDetail';

interface feed {
  user_id?: number;
  category?: string[];
  tags?: string[];
  image_urls?: string[];
  description?: string;
  feed_id?: number;
}

const test: feed = {
  image_urls: [
    'https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200',
    'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
    'https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg',
  ],
  user_id: 112233,
};

function FeedDetailPage() {
  const { id } = useParams();

  return (
    <Container>
      <Container1200>
        <FeedDetail {...test} />
        <Comments />
      </Container1200>
    </Container>
  );
}

export default FeedDetailPage;
