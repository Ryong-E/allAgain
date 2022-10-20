import styled from 'styled-components'
import { CommentItemType } from '../../types/campaignTypes'
import CommentItem from './CommentItem'
import CampaignCommentWrite from './CommentWrite'

const ReCommentItem = styled.div`
  margin-left: 50px;
`

interface ReComment{
  isShowReComment :Boolean;
  lastIdx : number;
  pathID : number;
  commentId : number;
  filteredComment : CommentItemType[];
}

export default function ReCommentBox({pathID, commentId, isShowReComment, lastIdx, filteredComment}: ReComment) {
  return (
    <ReCommentItem>
      {(isShowReComment && (lastIdx === commentId)) && <CampaignCommentWrite pathID={pathID} commentId={commentId}/>}
      {filteredComment.map((props)=>(
        <CommentItem {...props} key={props.commentId + Date.now()} />
      ))}
    </ReCommentItem>
  )
}
