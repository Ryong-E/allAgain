import { useState } from "react";

export default function TimeStamp() {
  const nD = new Date(); 
  const year = nD.getFullYear();
  const month = String(nD.getMonth()+1).padStart(2,"0");
  const date = String(nD.getDate()).padStart(2,"0");
  const hour = String(nD.getHours()).padStart(2,"0");
  const minute = String(nD.getMinutes()).padStart(2,"0");
  const seconds =String(nD.getSeconds()).padStart(2,"0");
  
  const [createdDate, setCreatedDate] = useState("2022-10-12 11:00:11");
  let createdDateArray: string[] = []
  const cD1 = createdDate.split(" ");
  const cD2 = cD1[0].split("-");
  const cD3 = cD1[1].split(":");

  cD2.forEach(ele=> createdDateArray.push(ele))
  cD3.forEach(ele=> createdDateArray.push(ele))


  

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
  return (
    <div className="timeStamp">
      {elapsedTime()}
    </div>
  )
}
