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
import { fixDate } from '../../utils/dateFix';
import { useRecoilValue } from 'recoil';
import { loggedInUserId } from '../../atoms/atoms';
import { CampaignItemType } from '../../types/campaignTypes';



export default function CampaignDetail(props: CampaignItemType): JSX.Element {
  const EditorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const loggedUser = useRecoilValue(loggedInUserId);
  const startDate = fixDate(String(props.recruitmentStartDate));
  const isSameUser = props.writer.userId === loggedUser;
  const recruitment  = props.recruitmentNumber;
  const participants = props.participantsCount-1;
  const isSameRate = recruitment - participants;
  useEffect(()=>{
    if(EditorRef.current !== null){
      EditorRef.current.innerHTML= `${props.content.replaceAll("&gt;", ">").replaceAll("&lt;", "<")}`
    }
  },[isActive,[]])
  return (
    <>
      {(isSameUser) && <CUDBtn campaignId={props.campaignId!} />}
      <CampaignItem {...props} />
      <CampaignIsJoin
          isJoin={props.participated}
          campaignId={props.campaignId}
          status={props.status}
          startDate={startDate}
          isSameUser={isSameUser}
          isSameRate={isSameRate}
          />
      <CampaignIntroDetail desc={props.introduce!}/>
      <ToggleBtn leftIconImg={contentIcon} leftText={'캠페인 내용'} rightIconImg={chatIcon} rightText={'댓글보기'} isActive={isActive} setIsActive={setIsActive} />
      {!isActive ? (
        <>
          <CampaignContents>
            <div ref={EditorRef}></div>
          </CampaignContents>
          <CampaignIsJoin
            isJoin={props.participated}
            campaignId={props.campaignId}
            status={props.status}
            startDate={startDate}
            isSameUser={isSameUser}
            isSameRate={isSameRate}
            />
          {(isSameUser) && <CUDBtn campaignId={props.campaignId!} JCTCenter={true} />}
        </>
      ) : (
        <CampaignComment comments={props.comments!} />
      )}
    </> 
  );
}
