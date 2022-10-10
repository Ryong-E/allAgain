import { useEffect, useRef, useState } from 'react';

interface feedProps {
  images?: string[];
  isClass?: boolean;
  author?: string;
}

function Feed({ images, isClass, author }: feedProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const imagesAlbum = useRef<HTMLDivElement>(null);

  const IMAGE_LAST_INDEX = images!.length - 1;
  const IMAGE_FIRST_INDEX = 0;

  const handleViewerClick = (isNext: boolean): void => {
    if (isNext)
      imageIndex !== IMAGE_LAST_INDEX && setImageIndex(imageIndex + 1);
    else imageIndex !== IMAGE_FIRST_INDEX && setImageIndex(imageIndex - 1);
  };

  useEffect(() => {
    imagesAlbum.current!.style.transform = `translateX(-${imageIndex * 100}%)`;
  }, [imageIndex]);

  return (
    <div
      style={{ width: '30vw', backgroundColor: 'black', overflow: 'hidden' }}>
      <div
        ref={imagesAlbum}
        style={{
          width: '100%',
          height: '30vw',
        }}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          {images!.map((imageUrl: string) => (
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={imageUrl}
              alt={imageUrl}
            />
          ))}
        </div>
      </div>
      <div>
        <button onClick={() => handleViewerClick(false)}>Prev</button>
        <button onClick={() => handleViewerClick(true)}>Next</button>
      </div>
    </div>
  );
}

export default Feed;
