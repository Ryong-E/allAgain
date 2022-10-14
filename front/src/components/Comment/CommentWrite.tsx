import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import sendHoverIcon from '../../assets/images/icons/icon_send_hover.png';
import sendIcon from '../../assets/images/icons/icon_send.png';
import sendRedIcon from '../../assets/images/icons/icon_red_send.png';
import UserImgBox from './UserImgBox';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { commentDumData } from '../../atoms/atoms';

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
  &.toMuch{
    position:relative;
    background-image: url(${sendRedIcon});
  }
`;



interface WriteInput {
  commentWrite?: string;
}

export interface CommentData{
  pathID : number;
  userId ?: number;
}



export default function CampaignCommentWrite({pathID,userId}: CommentData) {
  const [dumComment, setDumComment] = useRecoilState(commentDumData)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<WriteInput>();
  const onSubmit: SubmitHandler<WriteInput> = ({ commentWrite }) => {
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
  const commentLength = watch('commentWrite')?.length;
  return (
    <CommentWriteBox>
      <UserImgBox />
      <CommentFrom onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="댓글 달기...(최대 80자)" required {...register('commentWrite',{
          maxLength:80
        })} />
        <SubmitIconBtn className={commentLength! > 80 ? "toMuch" : ""} type="submit"/>
      </CommentFrom>
    </CommentWriteBox>
  );
}
