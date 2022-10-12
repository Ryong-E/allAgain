import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CampaignDetail from '../../components/CampaignItems/CampaignDetail';
import CampaignItem from '../../components/CampaignItems/CampaignItem';
import TagBox from '../../components/CampaignItems/TagBox';
import { Container, Container1300 } from '../../components/common/Containers';


export const Container1300Ver2 = styled(Container1300)`
  padding: 170px 0;
`



const CampaignItemLinkBox = styled.div`
  & + &{
    margin-top: 30px;
  }
`

export default function CampaignPage() {
  const [values, setValues] = useState(['모집 중', '진행예정', '모집마감']);
  const [currentValue, setCurrentValue] = useState('모집 중');
  return (
    <Container>
      <Container1300Ver2>
        <TagBox values={values} currentValue={currentValue} setCurrentValue={setCurrentValue} />
        <CampaignItemLinkBox>
          <Link to={`/campaign/:id`}>
            <CampaignItem />
          </Link>
        </CampaignItemLinkBox>
      </Container1300Ver2>
    </Container>
  );
}
