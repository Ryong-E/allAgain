import { useState } from 'react';
import styled from 'styled-components';
import { NextNavigationButton, PrevNavigationButton } from '../common/Buttons';

interface feedProps {
  user_id?: number;
  category?: string[];
  tags?: string[];
  image_urls?: string[];
  description?: string;
  feed_id?: number;
}

function FeedDetail({ image_urls, user_id, description, category }: feedProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const IMAGE_LAST_INDEX = image_urls!.length - 1;
  const IMAGE_FIRST_INDEX = 0;

  const handleViewerClick = (isNext: boolean): void => {
    if (isNext)
      imageIndex !== IMAGE_LAST_INDEX && setImageIndex(imageIndex + 1);
    else imageIndex !== IMAGE_FIRST_INDEX && setImageIndex(imageIndex - 1);
  };

  return (
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
          <PrevNavigationButton
            onClick={() => handleViewerClick(false)}
            visibility={imageIndex !== IMAGE_FIRST_INDEX}
          />
          <NextNavigationButton
            onClick={() => handleViewerClick(true)}
            visibility={imageIndex !== IMAGE_LAST_INDEX}
          />
        </AlbumSlideContainer>
      )}
    </Album>
  );
}

const Album = styled.div`
  width: 1200px;
  height: 650px;
  overflow: hidden;
  position: relative;
`;

const ImageList = styled.div<{ albumPage: number }>`
  display: flex;
  height: 100%;
  aspect-ratio: 1/1;
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

export default FeedDetail;
