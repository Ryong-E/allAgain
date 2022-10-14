import { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import CampaignItem from '../../components/CampaignItems/CampaignItem';
import TagBox from '../../components/CampaignItems/TagBox';
import { ConfirmButton } from '../../components/common/Buttons';
import { Container, Container1300 } from '../../components/common/Containers';
import { ROUTE } from "../../constant/route";
import { useRecoilValue } from "recoil"
import { campaignDumData } from "../../atoms/atoms"
import CampaignSlide from '../../components/CampaignItems/CampaignSlide';


const NoPaddingContainer = styled(Container)`
  padding : 70px 0 0;
  max-width: 100%;
`

export const Container1300Ver2 = styled(Container1300)`
  padding: 100px 0;
`

const AdditionalBox = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 50px;
`

const CreateCampaignBtn = styled(ConfirmButton)`
  height: 50px;
  width:auto;
`

const CampaignList = styled.div`

`
export default function CampaignPage() {
  const dum = useRecoilValue(campaignDumData);
  const [values, setValues] = useState(['모집 중', '모집예정', '모집마감']); 
  const [currentValue, setCurrentValue] = useState('모집 중');
  const filteredStatus = dum.filter(ele => ele.status === currentValue);
  
  return (
    <NoPaddingContainer>
      <CampaignSlide/>
      <Container1300Ver2>
        <AdditionalBox>
          <TagBox values={values} currentValue={currentValue} setCurrentValue={setCurrentValue} />
          <Link to={ROUTE.CAMPAGIN_DETAIL.link}>
            <CreateCampaignBtn>새로운 캠페인 등록</CreateCampaignBtn>
          </Link>
        </AdditionalBox>
        <CampaignList >
          {filteredStatus.map(props =>(
            <CampaignItem {...props} key={props.id+ props.campaign_id + props.userName} />
          ))}
        </CampaignList>
      </Container1300Ver2>
    </NoPaddingContainer>
  );
}
