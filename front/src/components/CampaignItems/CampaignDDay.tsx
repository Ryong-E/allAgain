import { useEffect } from "react";


interface CampaignDDay{
  status:String;
  endDate :String;
}

export default function CampaignDDay({status,  endDate}:CampaignDDay) {
  const fixDate = endDate.split(".").join("-");
  let D_DAY = new Date(fixDate);
  const todayTime = new Date();
  const remainingDate = Number(D_DAY) - Number(todayTime);
  const resultDate = Math.floor(remainingDate/ (1000*60*60*24));
  if(status === "모집 중"){
    return (
      <>{resultDate}일 남음</>
    )
  }else if(status === "모집예정"){
    return (
      <>{resultDate}일 후 모집 시작</>
    )
  }else{
    return (
      <>모집마감</>
    )
  }
  
}
