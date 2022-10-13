import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { commentDumData } from '../../atoms/atoms'
import CommentItem from './CommentItem'
import CampaignCommentWrite, { CommentDataType } from './CommentWrite'

const ReCommentItem = styled.div`
  margin-left: 50px;
`

interface ReCommentType extends CommentDataType{
  isShowReComment :Boolean
}

export default function ReCommentBox({pathID, userId, isShowReComment}: ReCommentType) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const filteredReComment = dumComment.filter(ele => ele.root_comment_id === String(userId!))

  console.log(filteredReComment)
  return (
    <ReCommentItem>
      {isShowReComment && <CampaignCommentWrite pathID={pathID} userId={userId!} />}
      {filteredReComment.map((props)=>(
        <CommentItem {...props} key={props.campaign_id + props.content + props.userId}/>
      ))}
    </ReCommentItem>
  )
}
