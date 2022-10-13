import CampaignDetail from "../../components/CampaignItems/CampaignDetail";
import CampaignItem from "../../components/CampaignItems/CampaignItem";
import { Container } from "../../components/common/Containers";
import { Container1300Ver2 } from "./CampaignPage";
import { useParams } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { campaignDumData } from "../../atoms/atoms";
import { useState } from "react";

export default function CampaignDetailPage() {
  const dum = useRecoilValue(campaignDumData);
  const {id} = useParams();
  const [currentData, setCurrentData] = useState(dum.find(x => x.id === Number(id)));
  return (
    <Container>
      <Container1300Ver2>
        <CampaignDetail {...currentData} />
      </Container1300Ver2>
    </Container>
  )
}
