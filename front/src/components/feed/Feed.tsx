import styled from "styled-components";
import { IFeed } from "../../types/feedTypes";
import { ShareButton, WarningButton } from "../common/Buttons";
import Album from "./Album";
import AuthorInfo from "./AuthorInfo";
import LikesCount from "./LikesCount";

interface feedProps extends IFeed {
  isSimple: boolean;
}

function Feed({ userId, imageUrls, feedId, isSimple }: feedProps) {
  return (
    <FeedContainer>
      <Album imageUrls={imageUrls} size="simple" feedId={feedId} />
      <MenuContainer>
        <LikesCount likes={1122} />
        <SocialButtonContainer>
          <WarningButton />
          <ShareButton />
        </SocialButtonContainer>
      </MenuContainer>
      {isSimple || (
        <PostContainer>
          <AuthorInfo size="simple" userId={userId} />
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
