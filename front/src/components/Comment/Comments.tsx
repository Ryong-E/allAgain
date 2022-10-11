import styled from 'styled-components';
import { useState } from 'react';
import CampaignUtilsBox from './CommentUtilsBox';
import CampaignCommentWrite from './CommentWrite';
import CampaignCommentBox from './CommentItem';

const CommentContainer = styled.div`
  padding: 30px 70px;
  border: 1px solid rgba(231, 225, 210, 0.8);
  margin: 0 0 500px;
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  background: ${({ theme }) => theme.colors.white};
  .userImgBox {
    margin: 0 30px;
    height: 30px;
    width: 30px;
    flex-shrink: 0;
    border: 1px solid #000;
  }
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
        <CampaignCommentBox />
      </CommentListBox>
    </CommentContainer>
  );
}
