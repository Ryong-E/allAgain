import CampaignDetail from '../../components/CampaignItems/CampaignDetail';
import CampaignItem from '../../components/CampaignItems/CampaignItem';
import { Container } from '../../components/common/Containers';
import { Container1300Ver2 } from './CampaignPage';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCampaignItem } from '../../api/campaignApi';
import { GET_DETAILCAMPAIGN } from '../../constant/queryKeys';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const {status, data, error} = useQuery([GET_DETAILCAMPAIGN], () => getCampaignItem(Number(id!)),{cacheTime:5});
  return (
    <Container>
      <Container1300Ver2>
        {data && <CampaignDetail {...data!} />}
      </Container1300Ver2>
    </Container>
  );
}
