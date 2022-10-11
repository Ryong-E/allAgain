import { useState } from 'react';
import styled from 'styled-components';
import {
  NextNavigationButton,
  PrevNavigationButton,
  ShareButton,
  WarningButton,
} from '../common/Buttons';
import FollowToggleSmall from '../common/FollowToggleSmall';
import LikeToggle from '../common/LikeToggle';

interface feedProps {
  user_id?: number;
  category?: string[];
  tags?: string[];
  image_urls?: string[];
  description?: string;
  feed_id?: number;
}

function Feed({ user_id, image_urls, feed_id }: feedProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const IMAGE_LAST_INDEX = image_urls!.length - 1;
  const IMAGE_FIRST_INDEX = 0;

  const handleViewerClick = (isNext: boolean): void => {
    if (isNext)
      imageIndex !== IMAGE_LAST_INDEX && setImageIndex(imageIndex + 1);
    else imageIndex !== IMAGE_FIRST_INDEX && setImageIndex(imageIndex - 1);
  };

  return (
    <FeedContainer>
      <Album>
        <ImageList albumPage={imageIndex}>
          {image_urls!.map((imageUrl: string) => (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageUrl}
              alt={imageUrl}
            />
          ))}
        </ImageList>
        {IMAGE_LAST_INDEX !== IMAGE_FIRST_INDEX && (
          <AlbumSlideContainer>
            <PrevNavigationButton onClick={() => handleViewerClick(false)} />
            <NextNavigationButton onClick={() => handleViewerClick(true)} />
          </AlbumSlideContainer>
        )}
      </Album>
      <MenuContainer>
        <Likes>
          <LikeToggle />
          <LikesCount>{100}</LikesCount>
        </Likes>
        {IMAGE_LAST_INDEX !== IMAGE_FIRST_INDEX && (
          <AlbumNavigator>
            {image_urls!.map((value, index) => (
              <Navigator observeIndex={index} currentIndex={imageIndex} />
            ))}
          </AlbumNavigator>
        )}
        <SocialButtonContainer>
          <WarningButton />
          <ShareButton />
        </SocialButtonContainer>
      </MenuContainer>
      <PostContainer>
        <AuthorInfo>
          <AuthorProfile />
          <AuthorName>테스트용</AuthorName>
          <AuthorBadge />
          <FollowToggleSmall />
        </AuthorInfo>
        <PostTime>3시간</PostTime>
      </PostContainer>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 400px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
  margin-bottom: 50px;
`;

const Album = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
`;

const ImageList = styled.div<{ albumPage: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${(props) => `translateX(-${props.albumPage * 100}%)`};
  transition: transform 0.25s ease;
`;

const AlbumSlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px 0 13px;
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7e1d2;
  display: flex;
  align-items: center;
`;

const AlbumNavigator = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  & > div {
    margin-right: 2px;
  }
`;

const Navigator = styled.div<{
  observeIndex: number;
  currentIndex: number;
}>`
  border-radius: 6px;
  width: 6px;
  height: 6px;
  background-color: ${(props) =>
    props.observeIndex === props.currentIndex
      ? '#E0D4B7'
      : 'rgba(231, 225, 210, 0.5)'};
  &:last-child {
    margin-right: 0px;
  }
  transition: background-color 0.25s ease;
`;

const Likes = styled.div`
  margin-left: 21px;
  height: 22px;
  display: flex;
  align-items: center;
`;

const LikesCount = styled.div`
  margin-left: 8px;
  color: #000000;
  height: 19px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
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

const AuthorInfo = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
`;

const AuthorProfile = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 36px;
  background-color: gray;
`;

const AuthorName = styled.div`
  margin: 0 0 0 14px;
  font-size: 16px;
  line-height: 19px;
  color: black;
`;

const AuthorBadge = styled.div`
  margin-left: 5px;
  margin-right: 14px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: #004d49;
`;

const PostTime = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  color: #aaaaaa;
`;

export default Feed;
