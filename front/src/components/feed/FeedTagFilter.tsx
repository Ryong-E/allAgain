import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SaveButton } from '../common/Buttons';

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

const TagList = {
  all: '전체',
  plastic: '플라스틱',
  fiber: '섬유',
  wood: '나무',
  paper: '종이류',
  glass: '유리',
  metal: '금속',
  rubber: '고무',
  etc: '그 외',
};

function FeedTagFilter() {
  const [selectedTag, setSelectedTag] = useState<TagTypes>('all');

  const handleTagButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTag((event.target as HTMLButtonElement).value as TagTypes);
  };

  return (
    <TagButtonContainer>
      {Object.entries(TagList).map(([key, value]) => (
        <TagButton
          value={key}
          selectedTag={selectedTag}
          onClick={handleTagButtonClick}>
          {value}
        </TagButton>
      ))}
    </TagButtonContainer>
  );
}

const TagButtonContainer = styled.div`
  margin-top: 174px;
  width: 810px;
  height: 71px;
  background-color: #f2eee3;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const TagButton = styled(SaveButton)<{ value: string; selectedTag: TagTypes }>`
  width: auto;
  height: 35px;
  font-size: 16px;
  padding: 0 18px;
  border-radius: 5px;
  box-shadow: none;
  ${(props) =>
    props.value === props.selectedTag
      ? css`
          background-color: #afa58d;
          color: #ffffff;
        `
      : css`
          background-color: rgba(0, 0, 0, 0);
          color: #928b7a;
        `}
  &:hover {
    color: #ffffff;
  }
`;

export default FeedTagFilter;
