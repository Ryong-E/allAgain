import styled from 'styled-components'
import { useForm, SubmitHandler } from "react-hook-form";
import sendHoverIcon from '../../assets/images/icons/icon_send_hover.png';
import sendIcon from '../../assets/images/icons/icon_send.png';
import UserImgBox from '../CampaignItems/UserImgBox';


const CommentWriteBox = styled.div`
  display: flex;
  padding: 15px 0 15px;
  align-items:center;
  height: 70px;
  border-bottom: 1px solid rgba(231, 225, 210, 1);
  &.ReComment{
    margin-left: 50px;
  }
`

const CommentFrom = styled.form`
  width:100%;
  display:flex;
  align-items:center;
  input {
    background: inherit;
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
`


const SubmitIconBtn = styled.button`
  width:20px;
  height:20px;
  background: url(${sendIcon}) center center no-repeat;
  background-size:cover;
  margin-left:20px;
  transition: background .3s;
  &:hover{
    background-image: url(${sendHoverIcon});
  }
`

interface ReCommentType {
  isReCommentWrite ?:Boolean;
}

interface WriteInputType {
  commentWrite ?: string;
}

export default function CampaignCommentWrite({isReCommentWrite}: ReCommentType) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<WriteInputType>();
  const onSubmit: SubmitHandler<WriteInputType> = ({commentWrite}) => {
      console.log("commentWrite",commentWrite);
  }
  return (
    <CommentWriteBox className={isReCommentWrite ? "ReComment" : ""} >
      <UserImgBox/>
      <CommentFrom onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="댓글 달기..." {...register("commentWrite")} />
        <SubmitIconBtn type="submit"></SubmitIconBtn>
      </CommentFrom>
    </CommentWriteBox>
  )
}
