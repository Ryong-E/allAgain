import { useState } from 'react';
import styled from 'styled-components';
import CampaignItem from '../CampaignItems/CampaignItem';
import { ConfirmButton, DelButton } from '../common/Buttons';
import CampaignComment from '../Comment/Comments';
import CampaignIsJoin from './CampaignIsJoin';
import ToggleBtn from './ToggleTabBtn';

import contentIcon from '../../assets/images/icons/icon_content.png';
import chatIcon from '../../assets/images/icons/icon_chat.png';
import CampaignContents from './CampaignContents';
import CUDBtn from './CUDBtn';

export default function CampaignDetail() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <CUDBtn />
      <CampaignItem />
      <CampaignIsJoin />
      <ToggleBtn leftIconImg={contentIcon} leftText={'캠페인 내용'} rightIconImg={chatIcon} rightText={'댓글보기'} isActive={isActive} setIsActive={setIsActive} />
      {/*  */}
      {!isActive ? (
        <>
          <CampaignContents>
            <h3>hi</h3>
          </CampaignContents>
          <CampaignIsJoin />
          <CUDBtn JCTCenter={true} />
        </>
      ) : (
        <CampaignComment />
      )}
    </>
  );
}
