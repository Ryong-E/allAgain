import styled from 'styled-components';
import { useState } from 'react';
import TimeStamp from './TimeStamp';
import { useRecoilState } from 'recoil';
import { commentDumData } from '../../atoms/atoms';

const UtilsBox = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.placeholder};
  margin-top: 10px;
  button {
    border: none;
    background: inherit;
    color: inherit;
  }
  .timeStamp {
    margin-right: 15px;
  }
  .reCommentBox {
    margin-right: 10px;
    button {
    }
  }
  .deleteBtnBox {
    button {
    }
  }
`;

interface CommentUtils {
  root_comment_id: String;
  userId: number;
  isReComment: Boolean;
  setIsReComment: React.Dispatch<React.SetStateAction<boolean>>;
  setShowIsReComment: React.Dispatch<React.SetStateAction<boolean>>;
  idx ?: number;
  setLastIdx : React.Dispatch<React.SetStateAction<number>>;
}

export default function CampaignUtilsBox({ setShowIsReComment, isReComment, setIsReComment, root_comment_id, userId, idx, setLastIdx }: CommentUtils) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData);
  const filteredComment = dumComment.filter((ele) => ele.root_comment_id === String(userId));
  const reCommentLength = filteredComment.length;
  const handleToggleReComment = () => {
    setIsReComment(true);
  };
  const handleToggleReCommentWrite = () =>{
    setIsReComment(true);
    setLastIdx(idx!);
    setShowIsReComment(true);
  }

  const handleDeleteComment = ()=>{
    const foundDeledtComment = dumComment.find(ele => ele.userId === userId!)
    const deletedComment = {...foundDeledtComment!,content:'작성자에 의해 삭제된 댓글입니다.'}
    setDumComment(prev => {
      const newList = [...prev];
      newList.splice(userId, 1, deletedComment)
      return newList
    })
  }


  return (
    <UtilsBox>
      <TimeStamp />
      {root_comment_id === '' && (
        <div className="reCommentBox">
          {
          (reCommentLength > 0 && !isReComment) ? 
          <button onClick={handleToggleReComment}>답글 {reCommentLength}개 보기</button>:
          <button onClick={handleToggleReCommentWrite}>답글 달기</button>
          }
        </div>
      )}
      <div className="deleteBtnBox">
        <button onClick={handleDeleteComment}>삭제</button>
      </div>
    </UtilsBox>
  );
}
