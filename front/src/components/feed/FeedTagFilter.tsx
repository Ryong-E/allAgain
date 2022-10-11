import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type TagTypes =
  | 'all'
  | 'plastic'
  | 'fiber'
  | 'wood'
  | 'paper'
  | 'glass'
  | 'metal'
  | 'rubber'
  | 'etc';

function FeedTagFilter() {
  const [selectedTag, setSelectedTag] = useState<TagTypes>('all');

  const handleTagButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTag((event.target as HTMLButtonElement).value as TagTypes);
    console.log((event.target as HTMLButtonElement).value);
  };

  return (
    <TagButtonContainer>
      <TagButton
        value='all'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        전체
      </TagButton>
      <TagButton
        value='plastic'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        플라스틱
      </TagButton>
      <TagButton
        value='fiber'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        섬유
      </TagButton>
      <TagButton
        value='wood'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        나무
      </TagButton>
      <TagButton
        value='paper'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        종이류
      </TagButton>
      <TagButton
        value='glass'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        유리
      </TagButton>
      <TagButton
        value='metal'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        금속
      </TagButton>
      <TagButton
        value='rubber'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        고무
      </TagButton>
      <TagButton
        value='etc'
        selectedTag={selectedTag}
        onClick={handleTagButtonClick}>
        그 외
      </TagButton>
    </TagButtonContainer>
  );
}

const TagButtonContainer = styled.div`
  margin-top: 174px;
  width: 748px;
  height: 71px;
  background-color: #f2eee3;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const TagButton = styled.button<{ value: string; selectedTag: TagTypes }>`
  height: 35px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  border: 0;
  border-radius: 5px;
  padding: 1px 18px;
  ${(props) =>
    props.value === props.selectedTag
      ? css`
          background-color: #afa58d;
          color: #000000;
        `
      : css`
          background-color: rgba(0, 0, 0, 0);
          color: #928b7a;
        `}
`;

export default FeedTagFilter;
