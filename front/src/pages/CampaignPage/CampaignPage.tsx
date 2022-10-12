import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CampaignDetail from '../../components/CampaignItems/CampaignDetail';
import CampaignItem from '../../components/CampaignItems/CampaignItem';
import TagBox from '../../components/CampaignItems/TagBox';
import { ConfirmButton } from '../../components/common/Buttons';
import { Container, Container1300 } from '../../components/common/Containers';


export const Container1300Ver2 = styled(Container1300)`
  padding: 170px 0;
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




export default function CampaignPage() {
  const [values, setValues] = useState(['모집 중', '진행예정', '모집마감']);
  const [currentValue, setCurrentValue] = useState('모집 중');
  return (
    <Container>
      <Container1300Ver2>
        <AdditionalBox>
          <TagBox values={values} currentValue={currentValue} setCurrentValue={setCurrentValue} />
          <Link to={'/campaigns/create'}>
            <CreateCampaignBtn>새로운 캠페인 등록</CreateCampaignBtn>
          </Link>
        </AdditionalBox>
        <CampaignItem />
      </Container1300Ver2>
    </Container>
  );
}
