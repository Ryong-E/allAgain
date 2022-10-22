import { useState } from "react";

interface TimestampType{
  timestamp : Date;
}

export default function TimeStamp({timestamp}: TimestampType) {
  const elapsedTime = ()=>{
    const today = new Date();
    const diff = (Number(today) - Number(timestamp))
    const times = [
      {time: "분", milliSeconds: 1000 * 60},
      {time: "시간", milliSeconds: 1000 * 60 * 60},
      {time: "일", milliSeconds: 1000 * 60 * 60 * 24},
      {time: "개월", milliSeconds: 1000 * 60 * 60 * 24 * 30},
      {time: "년", milliSeconds: 1000 * 60 * 60 * 24 * 365},
    ].reverse();
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      
      // 큰 단위는 0보다 작은 소수 단위 나옴
      if (betweenTime > 0) {
        return `${betweenTime}${value.time} 전`;
      }
    }
    return "방금 전";
  }
  return (
    <div className="timeStamp">
      {elapsedTime()}
    </div>
  )
}
