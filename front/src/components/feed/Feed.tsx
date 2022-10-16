import styled from 'styled-components';
import { ShareButton, WarningButton } from '../common/Buttons';
import Album from './Album';
import AuthorInfo from './AuthorInfo';
import LikesCount from './LikesCount';

const TEST_IMAGE_URLS = [
  'https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200',
  'https://product.cdn.cevaws.com/var/storage/images/_aliases/reference/media/feliway-2017/images/kor-kr/1_gnetb-7sfmbx49emluey4a/6341829-1-kor-KR/1_gNETb-7SfMBX49EMLUeY4A.jpg',
  'https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg',
];

interface IFeed {
  feedId: number;
  userId: number;
  category: string;
  tags: string;
  imageUrls: string[];
  description: string;
}

interface feedProps extends IFeed {
  isSimple: boolean;
}

function Feed({ userId, imageUrls, feedId, isSimple }: feedProps) {
  return (
    <FeedContainer>
      <Album imageUrls={TEST_IMAGE_URLS} size='simple' />
      <MenuContainer>
        <LikesCount likes={1122} />
        <SocialButtonContainer>
          <WarningButton />
          <ShareButton />
        </SocialButtonContainer>
      </MenuContainer>
      {isSimple || (
        <PostContainer>
          <AuthorInfo size='simple' userId={userId} />
          <PostTime>3시간</PostTime>
        </PostContainer>
      )}
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 400px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
  margin-bottom: 50px;
  &:first-child {
    margin-left: 0px;
  }
  margin-left: 50px;
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7e1d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SocialButtonContainer = styled.div`
  margin-right: 17px;
  width: 62px;
  height: 22px;
  display: flex;
  justify-content: space-between;
`;

const PostContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;
`;

const PostTime = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  color: #aaaaaa;
`;

export default Feed;
