import { useState } from 'react';
import styled from 'styled-components';
import { NextNavigationButton, PrevNavigationButton } from '../common/Buttons';
import Album from './Album';

interface feedProps {
  user_id?: number;
  category?: string[];
  tags?: string[];
  image_urls?: string[];
  description?: string;
  feed_id?: number;
}

function FeedDetail({ image_urls, user_id, description, category }: feedProps) {
  return (
    <>
      <Album image_urls={image_urls} size='detail' />
    </>
  );
}

const DetailContainer = styled.div`
  width: 1200px;
`;

const FeedHeader = styled.div`
  width: 1080px;
  height: 40px;
  display: flex;
`;

const FeedProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  object-fit: cover;
  overflow: hidden;
`;

const FeedAuthor = styled.div;

export default FeedDetail;
