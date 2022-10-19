import { useEffect } from "react";


interface CampaignDDay{
  status:String;
  endDate : Date | string;
  recruitmentNumber : number;
  endEvent : number;
}

export default function CampaignDDay({status,  endDate, recruitmentNumber, endEvent}: CampaignDDay) {
  const fixDate = String(endDate);
  let D_DAY = new Date(fixDate);
  const todayTime = new Date();
  const remainingDate = Number(D_DAY) - Number(todayTime);
  const resultDate = Math.floor(remainingDate / (1000*60*60*24)) + 1;
  const failCampaign = recruitmentNumber - endEvent === 0;

  if(status === "모집 중"){
    return (
      <>{resultDate === 0 ? <>오늘 자정 마감</> : <>{resultDate}일 남음</>}</>
    )
  }else if(status === "모집 예정"){
    return (
      <>{resultDate === 0 ? 1 : resultDate}일 후 모집 시작</>
    )
  }else{
    return (
      <>
        {failCampaign ? <>모집마감</> : <>캠페인 무산</>}
      </>
    )
  }
  
}
