import styled from "styled-components";
import { useState, useMemo } from "react";
import TimeStamp from "./TimeStamp";
import { CommentItemType } from "../../types/campaignTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "../../api/commentsApi";
import { useRecoilValue } from "recoil";
import { loggedInUserId } from "../../atoms/atoms";
import { DELETE_COMMENTS, FEED_DETAIL, GET_DETAILCAMPAIGN } from "../../constant/queryKeys";
import { useLocation } from "react-router-dom";
import ConfirmAlertModal from "../Modals/ConfirmAlertModal";

const UtilsBox = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.placeholder};
  margin-top: 10px;

  .timeStamp {
    margin-right: 15px;
  }
  .reCommentBox {
    margin-right: 10px;
    button {
    border: none;
    background: inherit;
    color: inherit;
    }
  }
  .deleteBtnBox {
    button {
      border: none;
    background: inherit;
    color: inherit;
    }
  }
`;

interface CommentUtils {
  rootCommentId: number | null;
  commentId: number;
  isReComment: Boolean;
  setIsReComment: React.Dispatch<React.SetStateAction<boolean>>;
  setShowIsReComment: React.Dispatch<React.SetStateAction<boolean>>;
  setLastIdx: React.Dispatch<React.SetStateAction<number>>;
  filteredComment: CommentItemType[];
  timestamp: Date;
  userId: number;
}

export default function CampaignUtilsBox({
  setShowIsReComment,
  isReComment,
  setIsReComment,
  rootCommentId,
  commentId,
  setLastIdx,
  filteredComment,
  timestamp,
  userId,
}: CommentUtils) {
  const reCommentLength = filteredComment.length;
  const queryClient = useQueryClient();
  const isLogin = useRecoilValue(loggedInUserId);
  const {pathname} = useLocation();
  const categotry = pathname.split("/")[1];
  const createdDate = new Date(timestamp);
  createdDate.setHours(createdDate.getHours() + 9)
  const [showModal, setShowModal] = useState(false);
  
  const handleToggleReComment = () => {
    setIsReComment(true);
  };
  const handleToggleReCommentWrite = () => {
    setIsReComment(true);
    setLastIdx(commentId);
    setShowIsReComment(true);
  };
  const deletedCommentMutate = useMutation(
    [DELETE_COMMENTS],
    deleteCommentApi,
    {
      onSuccess: (data: any, variables, context) => {
        queryClient.invalidateQueries([categotry === "campaign" ? GET_DETAILCAMPAIGN : FEED_DETAIL]);
      },
    }
  );
  const onClick = () => {
    deletedCommentMutate.mutate({commentId, pathname : categotry});
  };

  return (
    <UtilsBox>
      <TimeStamp timestamp={createdDate} />
      {rootCommentId === null && (
        <div className="reCommentBox">
          {reCommentLength > 0 && !isReComment ? (
            <button onClick={handleToggleReComment}>
              답글 {reCommentLength}개 보기
            </button>
          ) : (
            <button onClick={handleToggleReCommentWrite}>답글 달기</button>
          )}
        </div>
      )}
      {isLogin === userId && (
        <div className="deleteBtnBox">
          <button onClick={() => setShowModal(true)}>삭제</button>
        </div>
      )}
      {showModal && <ConfirmAlertModal content={"캠페인"} showModal={showModal} setShowModal={setShowModal} onClick={onClick} />}
    </UtilsBox>
  );
}
