import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { commentDumData } from '../../atoms/atoms'
import CommentItem from './CommentItem'
import CampaignCommentWrite, { CommentData } from './CommentWrite'

const ReCommentItem = styled.div`
  margin-left: 50px;
`

interface ReComment extends CommentData{
  isShowReComment :Boolean;
  idx : number;
  lastIdx : number;
}

export default function ReCommentBox({pathID, userId, isShowReComment, idx, lastIdx}: ReComment) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const filteredReComment = dumComment.filter(ele => ele.root_comment_id === String(userId!))
  
  return (
    <ReCommentItem>
      {(isShowReComment && (lastIdx === idx)) && <CampaignCommentWrite pathID={pathID} userId={userId!} />}
      {filteredReComment.map((props)=>(
        <CommentItem {...props} key={props.campaign_id + props.content + props.userId}/>
      ))}
    </ReCommentItem>
  )
}
