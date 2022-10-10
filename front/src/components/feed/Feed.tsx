import { useState } from 'react';
import styled from 'styled-components';

interface feedProps {
  images?: string[];
  isClass?: boolean;
  author?: string;
}

function Feed({ images, isClass, author }: feedProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const IMAGE_LAST_INDEX = images!.length - 1;
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
          {images!.map((imageUrl: string) => (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageUrl}
              alt={imageUrl}
            />
          ))}
        </ImageList>
        <ButtonContainer>
          <button onClick={() => handleViewerClick(false)}>Prev</button>
          <button onClick={() => handleViewerClick(true)}>Next</button>
        </ButtonContainer>
      </Album>
      <MenuContainer>
        {IMAGE_LAST_INDEX !== IMAGE_FIRST_INDEX && (
          <AlbumNavigator>
            {Array.from(
              { length: IMAGE_LAST_INDEX + 1 },
              (value, index) => index,
            ).map((index) => (
              <Navigator observeIndex={index} currentIndex={imageIndex} />
            ))}
          </AlbumNavigator>
        )}
      </MenuContainer>
      <ProfileContainer></ProfileContainer>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 400px;
  box-shadow: 5px 5px 10px rgba(231, 225, 210, 0.8);
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
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7e1d2;
  display: flex;
`;

const AlbumNavigator = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
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
`;

const ProfileContainer = styled.div`
  height: 60px;
  display: flex;
`;

export default Feed;
