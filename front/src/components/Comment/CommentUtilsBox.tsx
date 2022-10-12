import styled from 'styled-components'
import {useState} from 'react'
import TimeStamp from './TimeStamp';

const UtilsBox = styled.div`
display: flex;
font-size:12px;
color: ${({theme})=> theme.colors.placeholder};
margin-top: 10px;
button{
    border:none;
    background: inherit;
    color: inherit;
}
.timeStamp{
  margin-right: 15px;
}
.reCommentBox{
  margin-right: 10px;
  button{
  }
}
.deleteBtnBox{
  button{

  }
}
`

interface ReCommentType {
  setIsReComment : React.Dispatch<React.SetStateAction<boolean>>;
}


export default function CampaignUtilsBox({setIsReComment}: ReCommentType) {
   // 시간체크
  

  const handleToggleReComment = ()=>{
    setIsReComment(prev => !prev)
  }

  return (
    <UtilsBox>
      <TimeStamp/>
      <div className="reCommentBox">
        {/* 
            length 값 잡고 0보다 크면 답글 {length}개 보기 
            보기 눌렀을 때 보기 사라지고 답글 달기만 남기기
            0이라면 답글 달기
        */}
        <button onClick={handleToggleReComment}>답글 달기</button>
      </div>
      <div className="deleteBtnBox">
        <button>삭제</button>
      </div>
    </UtilsBox>
  )
}
