import CampaignDetail from '../../components/CampaignItems/CampaignDetail';
import CampaignItem from '../../components/CampaignItems/CampaignItem';
import { Container } from '../../components/common/Containers';
import { Container1300Ver2 } from './CampaignPage';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { campaignDumData } from '../../atoms/atoms';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCampaignItem } from '../../api/campaignApi';

export default function CampaignDetailPage() {
  const dum = useRecoilValue(campaignDumData);
  
  const { id } = useParams();
  // const {status, data, error} = useQuery(["detailCampaign"], getCampaignItem(Number(id!)));
  // console.log(data)
  const [currentData, setCurrentData] = useState(
    dum.find((x) => x.id === Number(id)),
  );
  return (
    <Container>
      <Container1300Ver2>
        {/* <CampaignDetail {...currentData} /> */}
      </Container1300Ver2>
    </Container>
  );
}
