import styled from 'styled-components';
import { useState } from 'react';
import CampaignUtilsBox from './CommentUtilsBox';
import CampaignCommentWrite from './CommentWrite';
import CampaignCommentItem from './CommentItem';

const CommentContainer = styled.div`
  padding: 30px 70px;
  border: 1px solid rgba(231, 225, 210, 0.8);
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  background: ${({ theme }) => theme.colors.white};

`;

const CommentListBox = styled.div``;

export default function Comments() {
  // disabled
  // 삭제
  // deps

  return (
    <CommentContainer>
      <CampaignCommentWrite />
      <CommentListBox>
        <CampaignCommentItem />
        <CampaignCommentItem />
      </CommentListBox>
    </CommentContainer>
  );
}
