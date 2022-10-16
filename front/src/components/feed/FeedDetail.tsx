import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteFeed } from "../../api/feedApi";
import { FeedType } from "../../types/feedTypes";
import {
  DelButton,
  ConfirmButton,
  ShareButton,
  WarningButton,
} from "../common/Buttons";
import Album from "./Album";
import AuthorInfo from "./AuthorInfo";
import LikesCount from "./LikesCount";

function FeedDetail({
  imageUrls,
  userId,
  feedId,
  description,
  category,
}: FeedType) {
  const navigator = useNavigate();

  const handleDeleteClick = async () => {
    await deleteFeed(feedId);
    navigator(-1);
  };

  const handleEditClick = () => {
    navigator(`/feed/update/${feedId}`);
  };

  return (
    <>
      <ButtonContainer>
        <DelButton onClick={handleDeleteClick}>삭제</DelButton>
        <ConfirmButton onClick={handleEditClick}>수정</ConfirmButton>
      </ButtonContainer>
      <Album imageUrls={imageUrls} size="detail" feedId={feedId} />
      <DetailContainer>
        <DetailHeader>
          <AuthorInfo size="detail" userId={userId} />
          <LikesCount likes={1122} />
          <SocialButtonContainer>
            <WarningButton />
            <ShareButton />
          </SocialButtonContainer>
        </DetailHeader>
        <DetailTime>
          <PostTime>3시간 전</PostTime>
        </DetailTime>
        <DetailSection>{description}</DetailSection>
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
const ButtonContainer = styled.div`
  margin-top: 173px;
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

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
  margin-bottom: 43px;
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
