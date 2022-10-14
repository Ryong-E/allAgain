import { useEffect, useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import {  getCampaignList } from '../../api/campaignApi';


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
  const {status, data, error} = useQuery(['list'], getCampaignList);

  const dum = useRecoilValue(campaignDumData);
  const [values, setValues] = useState(['모집 중', '모집 예정', '모집 마감']); 
  const [currentValue, setCurrentValue] = useState('모집 중');
  const filteredStatus = data && data!.filter(ele => ele.status === currentValue);

  // const dataList = data && data.filter((x => x.status === currentValue));
  
  console.log(data);
  
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
          {data && filteredStatus!.map(props =>(
            <CampaignItem {...props} key={`${props.id , props.campaignId ,props.title}`} />
          ))}
        </CampaignList>
      </Container1300Ver2>
    </NoPaddingContainer>
  );
}
