import styled from "styled-components";
import { useState } from "react";
import CommentWrite from "./CommentWrite";
import CommentItem from "./CommentItem";
import { useParams } from "react-router-dom";
import { CommentItemArrType, CommentItemType } from "../../types/campaignTypes";

const CommentContainer = styled.div`
  padding: 30px 70px;
  border: 1px solid rgba(231, 225, 210, 0.8);
  box-shadow: ${({ theme }) => theme.boxShadowDefault};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const CommentListBox = styled.div``;

export default function Comments({ comments }: CommentItemArrType) {
  const { id: pathID } = useParams();
  const filteredComments = comments.filter(
    (ele: CommentItemType) => ele.rootCommentId === null
  );
  const [lastIdx, setLastIdx] = useState(-1);
  return (
    <CommentContainer>
      <CommentWrite pathID={Number(pathID)}  />
      <CommentListBox>
        {filteredComments.map((props: CommentItemType) => (
          <CommentItem
            {...props}
            comments={comments}
            lastIdx={lastIdx}
            setLastIdx={setLastIdx}
            pathID={Number(pathID)}
            key={props.commentId}
          />
        ))}
      </CommentListBox>
    </CommentContainer>
  );
}
