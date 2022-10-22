import styled from "styled-components";
import { useState, useMemo } from "react";
import CampaignUtilsBox from "./CommentUtilsBox";
import UserImgBox from "./UserImgBox";
import UserName from "../common/UserName";
import { Link } from "react-router-dom";
import ReCommentBox from "./ReCommentBox";
import { CommentItemType } from "../../types/campaignTypes";

const CommentBox = styled.div`
  display: flex;
  padding: 25px 0 0;

  .userImgBox {
    margin: 5px 20px 0 !important;
  }

  .commentTextBox {
    > a {
      display: inline-block;
      margin-bottom: 5px;
      .userNameBox {
        .userName {
          font-weight: 600;
          font-size: 15px;
        }
      }
      .isFamousUser {
      }
    }

    .comment {
      word-break: break-all;

      > button {
        font-size: 13px;
        color: ${({ theme }) => theme.colors.darkBeige};
      }
    }
  }
`;

export interface CommentItem extends CommentItemType {
  pathID?: number;
  lastIdx?: number;
  setLastIdx?: React.Dispatch<React.SetStateAction<number>>;
  comments?: CommentItemType[];
}

export default function CommentItem({
  commentId,
  content,
  rootCommentId,
  timestamp,
  writer,
  pathID,
  setLastIdx,
  lastIdx,
  comments,
}: CommentItem) {
  const [isReComment, setIsReComment] = useState(false);
  const [isShowReComment, setShowIsReComment] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const filteredComment = useMemo(() => {
    if (comments! === (null || undefined)) {
      return [];
    }
    return comments!.filter(
      (ele: CommentItemType) => ele.rootCommentId === commentId
    );
  }, [comments!]);
  return (
    <>
      <CommentBox>
        <Link to={`/user/${writer.userId}`}>
          <UserImgBox userImg={writer.image}/>
        </Link>
        <div className="commentTextBox">
          <Link to={`/user/${writer.userId}`}>
            <UserName userName={writer.nickname} />
          </Link>
          <div className="comment">
            {content.length >= 100 ? (
              <>
                {isLong ? content : content.slice(0, 70) + "..."}
                <br />
                <button
                  onClick={() => {
                    setIsLong(!isLong);
                  }}>
                  {isLong ? <>간략히 보기</> : <>자세히 보기</>}
                </button>
              </>
            ) : (
              content
            )}
          </div>
          <CampaignUtilsBox
            userId={writer.userId}
            timestamp={timestamp}
            filteredComment={filteredComment}
            setShowIsReComment={setShowIsReComment}
            isReComment={isReComment}
            setIsReComment={setIsReComment}
            rootCommentId={rootCommentId}
            commentId={commentId}
            setLastIdx={setLastIdx!}
          />
        </div>
      </CommentBox>
      {isReComment && (
        <ReCommentBox
          filteredComment={filteredComment}
          lastIdx={lastIdx!}
          isShowReComment={isShowReComment}
          pathID={pathID!}
          commentId={commentId}
        />
      )}
    </>
  );
}
