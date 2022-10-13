import styled from 'styled-components';
import { useState } from 'react';
import CampaignUtilsBox from './CommentUtilsBox';
import CampaignCommentWrite from './CommentWrite';
import CampaignCommentItem from './CommentItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { campaignDumData, commentDumData } from '../../atoms/atoms';
import { useParams } from 'react-router-dom';

const CommentContainer = styled.div`
  padding: 30px 70px;
  border: 1px solid rgba(231, 225, 210, 0.8);
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  background: ${({ theme }) => theme.colors.white};

`;

const CommentListBox = styled.div``;



export default function Comments() {
  const {id : pathID} = useParams();
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const filteredDumComment = dumComment.filter(ele => ele.campaign_id === Number(pathID) && ele.root_comment_id === "");

  return (
    <CommentContainer>
      <CampaignCommentWrite pathID={Number(pathID)} />
      <CommentListBox>
        {filteredDumComment?.map((props, idx)=>(
          <CampaignCommentItem {...props} key={props.campaign_id + props.userId + props.content} pathID={Number(pathID)} />
        ))}
      </CommentListBox>
    </CommentContainer>
  );
}
