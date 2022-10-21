import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { deleteFeed } from "../../api/feedApi";
import { loggedInUserId } from "../../atoms/atoms";
import { FeedType } from "../../types/feedTypes";
import TimeStamp from "../Comment/TimeStamp";
import { DelButton, ConfirmButton } from "../common/Buttons";
import ShareBox from "../common/ShareBox";
import ConfirmAlertModal from "../Modals/ConfirmAlertModal";
import Album from "./Album";
import AuthorInfo from "./AuthorInfo";
import LikesCount from "./LikesCount";

function FeedDetail({
  imageUrls,
  userId,
  feedId,
  description,
  category,
  tags,
  nickname,
  authorImageUrl,
  likes,
  datetime,
}: FeedType) {
  const currentUserId = useRecoilValue(loggedInUserId);
  const navigator = useNavigate();
  const { state } = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    await deleteFeed(feedId);
    navigator(state ? `${state}` : `/feed/`);
  };

  const handleEditClick = () => {
    navigator(`/feed/update/${feedId}`);
  };

  return (
    <>
      {currentUserId === userId && (
        <ButtonContainer>
          <DelButton onClick={() => setShowModal(true)}>삭제</DelButton>
          <ConfirmButton onClick={handleEditClick}>수정</ConfirmButton>
        </ButtonContainer>
      )}
      <AlbumBox>
        <Album imageUrls={imageUrls} size="detail" feedId={feedId} />
      </AlbumBox>
      <DetailContainer>
        <DetailHeader>
          <AuthorInfo
            size="detail"
            userId={userId}
            nickname={nickname}
            authorImageUrl={authorImageUrl}
          />
          <LikesCount likeList={likes ? likes : []} feedId={feedId} />
          <SocialButtonContainer>
            <ShareBox contentId={feedId} />
          </SocialButtonContainer>
        </DetailHeader>
        <DetailTime>
          <PostTime>
            <TimeStamp
              timestamp={
                datetime ? new Date(datetime) : new Date()
              }></TimeStamp>
          </PostTime>
        </DetailTime>
        <DetailSection>{description}</DetailSection>
        <CategoryContainer>
          {category.split(",").map((cate) => (
            <Category key={cate}>{cate}</Category>
          ))}
        </CategoryContainer>
      </DetailContainer>
      <DetailTagContainer>
        {tags.split(",").map((tag) => (
          <DetailTag key={tag}>{tag}</DetailTag>
        ))}
      </DetailTagContainer>
      <ConfirmAlertModal
        content={"피드"}
        showModal={showModal}
        setShowModal={setShowModal}
        onClick={handleDeleteClick}
      />
    </>
  );
}

const AlbumBox = styled.div`
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
`;

const ButtonContainer = styled.div`
  margin-top: 173px;
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const DetailContainer = styled.div`
  width: 1200px;
  padding: 40px 60px 20px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
  margin-top: 80px;
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

const CategoryContainer = styled.div`
  margin-top: 65px;
  width: 100%;
  display: flex;
`;

const Category = styled.div`
  background: ${({ theme }) => theme.colors.dasidaGreen};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.dasidaGreen};
  width: 70px;
  border-radius: 60px;
  padding: 0px;
  font-size: 12px;
  text-align: center;
  margin-right: 7px;
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
  justify-content: flex-end;
`;
export default FeedDetail;
