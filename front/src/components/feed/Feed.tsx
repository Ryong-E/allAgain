import { useState } from 'react';
import styled from 'styled-components';

const ImageList = styled.div<{ albumPage: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${(props) => `translateX(-${props.albumPage * 100}%)`};
`;

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
    <div
      style={{ width: '30vw', backgroundColor: 'black', overflow: 'hidden' }}>
      <div
        style={{
          width: '100%',
          height: '30vw',
        }}>
        <ImageList
          albumPage={imageIndex}
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}>
          {images!.map((imageUrl: string) => (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageUrl}
              alt={imageUrl}
            />
          ))}
        </ImageList>
      </div>
      <div>
        <button onClick={() => handleViewerClick(false)}>Prev</button>
        <button onClick={() => handleViewerClick(true)}>Next</button>
      </div>
    </div>
  );
}

export default Feed;
