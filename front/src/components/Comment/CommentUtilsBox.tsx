import styled from 'styled-components'
import {useState} from 'react'

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
  const nD = new Date(); 
  const year = nD.getFullYear();
  const month = String(nD.getMonth()+1).padStart(2,"0");
  const date = String(nD.getDate()).padStart(2,"0");
  const hour = String(nD.getHours()).padStart(2,"0");
  const minute = String(nD.getMinutes()).padStart(2,"0");
  const seconds =String(nD.getSeconds()).padStart(2,"0");
  
  const [createdDate, setCreatedDate] = useState("2022-10-11 15:22:11");
  let createdDateArray: string[] = []
  const cD1 = createdDate.split("-");
  const cD2 = cD1[2].split(" ");
  const cD3 = cD2[1].split(":");

  createdDateArray.push(cD1[0])
  createdDateArray.push(cD1[1])
  createdDateArray.push(cD2[0])
  createdDateArray.push(cD3[0])
  createdDateArray.push(cD3[1])
  createdDateArray.push(cD3[2])



  const elapsedTime = ()=>{
    if((Number(year) - Number(createdDateArray[0])) > 0){
      return `${(Number(year) - Number(createdDateArray[0]))}년 전`
    }
    else if((Number(month) - Number(createdDateArray[1])) > 0){
      return `${(Number(month) - Number(createdDateArray[1]))}달 전`
    }
    else if((Number(date) - Number(createdDateArray[2])) > 0){
      return `${(Number(date) - Number(createdDateArray[2]))}일 전`
    }
    else if((Number(hour) - Number(createdDateArray[3])) > 0){
      return `${(Number(hour) - Number(createdDateArray[3]))}시간 전`
    }
    else if((Number(minute) - Number(createdDateArray[4])) > 0){
      return `${(Number(minute) - Number(createdDateArray[4]))}분 전`
    }
    else{
      return `${(Number(seconds) - Number(createdDateArray[5]))}초 전`
    }
  }

  const handleToggleReComment = ()=>{
    setIsReComment(prev => !prev)
  }

  return (
    <UtilsBox>
      <div className="timeStamp">
        {elapsedTime()}
      </div>
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
