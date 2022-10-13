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

export default function ReCommentBox({pathID, id, isShowReComment}: ReCommentType) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const filteredReComment = dumComment.filter(ele => ele.root_comment_id === String(id!))
  console.log(isShowReComment)
  return (
    <ReCommentItem>
      {isShowReComment && <CampaignCommentWrite pathID={pathID} id={id!} />}
      {filteredReComment.map((props)=>(
        <CommentItem {...props} key={props.campaign_id + props.content + props.id}/>
      ))}
    </ReCommentItem>
  )
}
