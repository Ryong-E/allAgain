import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import sendHoverIcon from '../../assets/images/icons/icon_send_hover.png';
import sendIcon from '../../assets/images/icons/icon_send.png';
import UserImgBox from './UserImgBox';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { CommentItemType } from './CommentItem';
import { commentDumData } from '../../atoms/atoms';
import { useEffect } from 'react';

const CommentWriteBox = styled.div`
  display: flex;
  padding: 15px 0 15px;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid rgba(231, 225, 210, 1);

`;

const CommentFrom = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    background: inherit;
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
`;

const SubmitIconBtn = styled.button`
  width: 20px;
  height: 20px;
  background: url(${sendIcon}) center center no-repeat;
  background-size: cover;
  margin-left: 20px;
  transition: background 0.3s;
  &:hover {
    background-image: url(${sendHoverIcon});
  }
`;



interface WriteInputType {
  commentWrite?: string;
}

export interface CommentDataType{
  pathID : number;
  userId ?: number;
}



export default function CampaignCommentWrite({pathID,userId}: CommentDataType) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<WriteInputType>();
  const onSubmit: SubmitHandler<WriteInputType> = ({ commentWrite }) => {
    const lastId = Number(dumComment[dumComment.length-1].userId) + 1
    const newComment = {
      campaign_id : pathID,
      userId :  lastId,
      root_comment_id : userId !== undefined ? `${userId}` : "",
      content : commentWrite!,
      userName :"김다시"
    }
    setDumComment((prev) => [ ...prev, newComment ])
    reset()
  };
  return (
    <CommentWriteBox>
      <UserImgBox />
      <CommentFrom onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="댓글 달기..." required {...register('commentWrite')} />
        <SubmitIconBtn type="submit"/>
      </CommentFrom>
    </CommentWriteBox>
  );
}
