import { useState } from "react";
import styled from "styled-components";
import { FeedType } from "../../types/feedTypes";
import TimeStamp from "../Comment/TimeStamp";
import { ShareButton, WarningButton } from "../common/Buttons";
import Album from "./Album";
import AuthorInfo from "./AuthorInfo";
import LikesCount from "./LikesCount";

interface feedProps extends FeedType {
  isSimple: boolean;
}

function Feed({
  userId,
  imageUrls,
  feedId,
  isSimple,
  nickname,
  authorImageUrl,
  likes,
  datetime,
}: feedProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <FeedContainer>
      <Album imageUrls={imageUrls} size="simple" feedId={feedId} />
      <MenuContainer>
        <LikesCount likeList={likes ? likes : []} feedId={feedId} />
        <SocialButtonContainer>
          <WarningButton />
          <ShareButton />
        </SocialButtonContainer>
      </MenuContainer>
      {isAdmin && <FeedAdminBorder />}
      {isAdmin && <FeedAdminBanner>Class</FeedAdminBanner>}
      {isSimple || (
        <PostContainer isAdmin={isAdmin}>
          <AuthorInfo
            size="simple"
            userId={userId}
            isAdmin={isAdmin}
            nickname={nickname}
            authorImageUrl={authorImageUrl}
          />
          {isAdmin || (
            <PostTime>
              <TimeStamp
                timestamp={
                  datetime ? new Date(datetime) : new Date()
                }></TimeStamp>
            </PostTime>
          )}
        </PostContainer>
      )}
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 400px;
  position: relative;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
  margin-bottom: 50px;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  margin-right: 50px;
`;

const FeedAdminBorder = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100%);
  height: calc(100%);
  border: ${({ theme }) => theme.colors.dasidaGreen} solid 2px;
`;

const FeedAdminBanner = styled.div`
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 14px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.dasidaGreen};
  width: 70px;
  height: 30px;
  font-size: 14px;
  line-height: 28px;
  font-weight: 700;
  text-align: center;
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

const PostContainer = styled.div<{ isAdmin: boolean }>`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isAdmin ? props.theme.colors.dasidaGreen : props.theme.colors.white};
`;

const PostTime = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  color: #aaaaaa;
`;

export default Feed;
