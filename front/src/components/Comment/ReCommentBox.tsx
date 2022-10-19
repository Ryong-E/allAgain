import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { commentDumData } from '../../atoms/atoms'
import { CommentItemType } from '../../types/campaignTypes'
import CommentItem from './CommentItem'
import CampaignCommentWrite from './CommentWrite'

const ReCommentItem = styled.div`
  margin-left: 50px;
`

interface ReComment{
  isShowReComment :Boolean;
  idx : number;
  lastIdx : number;
  pathID : number;
  commentId : number;
  comments : CommentItemType[];
}

export default function ReCommentBox({pathID, commentId, isShowReComment, idx, lastIdx, comments}: ReComment) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const filteredReComment = comments.filter((ele: CommentItemType) => ele.rootCommentId === commentId)
  
  return (
    <ReCommentItem>
      {(isShowReComment && (lastIdx === idx)) && <CampaignCommentWrite pathID={pathID} commentId={commentId} />}
      {filteredReComment.map((props : CommentItemType)=>(
        <CommentItem {...props} key={props.writer.userId + props.commentId}/>
      ))}
    </ReCommentItem>
  )
}
