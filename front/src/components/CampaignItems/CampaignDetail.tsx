import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CampaignItem from '../CampaignItems/CampaignItem';
import { ConfirmButton, DelButton } from '../common/Buttons';
import CampaignComment from '../Comment/Comments';
import CampaignIsJoin from './CampaignIsJoin';
import ToggleBtn from '../common/ToggleTabBtn';

import contentIcon from '../../assets/images/icons/icon_content.png';
import chatIcon from '../../assets/images/icons/icon_chat.png';
import CampaignContents from './CampaignContents';
import CUDBtn from './CUDBtn';
import CampaignIntroDetail from './CampaignIntroDetail';
import QuillEditor from './QuillEditor';
import { CampaignItemType } from '../../api/campaignApi';
import { fixDate } from '../../utils/dateFix';



export default function CampaignDetail(props: CampaignItemType): JSX.Element {
  const EditorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const startDate = fixDate(String(props.recruitmentStartDate));
  useEffect(()=>{
    if(EditorRef.current !== null){
      EditorRef.current.innerHTML= `${props.content.replaceAll("&gt;", ">").replaceAll("&lt;", "<")}`
    }
  },[isActive])
  return (
    <>
      <CUDBtn campaignId={props.campaignId!} />
      <CampaignItem {...props} />
      <CampaignIsJoin
          isJoin={props.participated}
          campaignId={props.campaignId}
          status={props.status}
          startDate={startDate}
          />
      <CampaignIntroDetail desc={props.introduce!}/>
      <ToggleBtn leftIconImg={contentIcon} leftText={'캠페인 내용'} rightIconImg={chatIcon} rightText={'댓글보기'} isActive={isActive} setIsActive={setIsActive} />
      {!isActive ? (
        <>
          <CampaignContents>
            <div ref={EditorRef}></div>
          </CampaignContents>
          <CampaignIsJoin
            isJoin={isJoin}
            campaignId={props.campaignId}
            status={props.status}
            startDate={startDate}
            />
          <CUDBtn campaignId={props.campaignId!} JCTCenter={true} />
        </>
      ) : (
        <CampaignComment />
      )}
    </> 
  );
}
