import { useState } from 'react';
import styled, { css } from 'styled-components';
import { NextNavigationButton, PrevNavigationButton } from '../common/Buttons';

interface albumProps {
  size: 'simple' | 'detail';
  image_urls?: string[];
}

function Album({ size, image_urls }: albumProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const IMAGE_LAST_INDEX = image_urls!.length - 1;
  const IMAGE_FIRST_INDEX = 0;

  const handleViewerClick = (isNext: boolean): void => {
    if (isNext)
      imageIndex !== IMAGE_LAST_INDEX && setImageIndex(imageIndex + 1);
    else imageIndex !== IMAGE_FIRST_INDEX && setImageIndex(imageIndex - 1);
  };

  return (
    <AlbumContainer>
      <ImageContainer size={size}>
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
          <ImageSlideContainer>
            <PrevNavigationButton
              onClick={() => handleViewerClick(false)}
              visibility={imageIndex !== IMAGE_FIRST_INDEX}
            />
            <NextNavigationButton
              onClick={() => handleViewerClick(true)}
              visibility={imageIndex !== IMAGE_LAST_INDEX}
            />
          </ImageSlideContainer>
        )}
      </ImageContainer>
      {IMAGE_LAST_INDEX !== IMAGE_FIRST_INDEX && (
        <ImageNavigator>
          {image_urls!.map((value, index) => (
            <Navigator observeIndex={index} currentIndex={imageIndex} />
          ))}
        </ImageNavigator>
      )}
    </AlbumContainer>
  );
}
const AlbumContainer = styled.div`
  position: relative;
`;

const ImageContainer = styled.div<{ size: 'simple' | 'detail' }>`
  ${(props) =>
    props.size === 'simple'
      ? css`
          width: 100%;
          aspect-ratio: 1/1;
        `
      : css`
          width: 1200px;
          height: 650px;
        `}
  position: relative;
  overflow: hidden;
`;

const ImageList = styled.div<{ albumPage: number }>`
  display: flex;
  height: 100%;
  aspect-ratio: 1/1;
  transform: ${(props) => `translateX(-${props.albumPage * 100}%)`};
  transition: transform 0.25s ease;
`;

const ImageSlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px 0 13px;
`;

const ImageNavigator = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    margin-right: 2px;
  }
`;

const Navigator = styled.div<{
  observeIndex: number;
  currentIndex: number;
}>`
  z-index: 100;
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

export default Album;
