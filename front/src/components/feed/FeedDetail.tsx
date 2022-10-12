import styled from 'styled-components';
import { ShareButton, WarningButton } from '../common/Buttons';
import Album from './Album';
import AuthorInfo from './AuthorInfo';
import LikesCount from './LikesCount';

interface feedProps {
  user_id?: number;
  category?: string[];
  tags?: string[];
  image_urls?: string[];
  description?: string;
  feed_id?: number;
}

function FeedDetail({ image_urls, user_id, description, category }: feedProps) {
  return (
    <>
      <Album image_urls={image_urls} size='detail' />
      <DetailContainer>
        <DetailHeader>
          <AuthorInfo size='detail' user_id={12321} />
          <LikesCount likes={1122} />
          <SocialButtonContainer>
            <WarningButton />
            <ShareButton />
          </SocialButtonContainer>
        </DetailHeader>
        <DetailTime>
          <PostTime>3시간 전</PostTime>
        </DetailTime>
        <DetailSection>
          실제 우유팩을 인쇄하는 과정에서 발생하는 파지를 새활용한 소재로
          카드지갑, 동전지갑 등 다양한 제품을 만들어보았습니다. 만드는 법이
          어렵지 않고 알록달록 매력적인 디자인이라 아이들과 함께 만들기 좋아요!
          우유팩이 재료인 만큼 탄탄하고 방수도 가능합니다.
        </DetailSection>
      </DetailContainer>
      <DetailTagContainer>
        <DetailTag>테스트1</DetailTag>
        <DetailTag>테스트2</DetailTag>
        <DetailTag>테스트3</DetailTag>
        <DetailTag>테스트4</DetailTag>
      </DetailTagContainer>
    </>
  );
}

const DetailContainer = styled.div`
  width: 1200px;
  padding: 40px 60px;
  background-color: #ffffff;
`;

const DetailHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const DetailTime = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const PostTime = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  color: #aaaaaa;
`;

const DetailSection = styled.div`
  margin-top: 25px;
  width: 100%;
  font-size: 15px;
  line-height: 36px;
`;

const DetailTagContainer = styled.div`
  width: 1200px;
  padding: 14px 45px 14px 45px;
  background-color: #004d49;
  display: flex;
`;

const DetailTag = styled.div`
  color: #ffffff;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  text-align: center;
  margin-right: 15px;
  &:last-child {
    margin-right: 0px;
  }
`;
const SocialButtonContainer = styled.div`
  width: 62px;
  height: 22px;
  display: flex;
  justify-content: space-between;
`;
export default FeedDetail;
