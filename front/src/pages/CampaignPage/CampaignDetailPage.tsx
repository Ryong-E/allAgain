import CampaignDetail from "../../components/CampaignItems/CampaignDetail";
import { Container } from "../../components/common/Containers";
import { CampaingContainer } from "./CampaignPage";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCampaignItem } from "../../api/campaignApi";
import { GET_DETAILCAMPAIGN } from "../../constant/queryKeys";
import { loggedInUserId } from "../../atoms/atoms";
import styled from "styled-components";

const CampaignDetailRoot = styled(Container)`
  padding : 170px 4.1666vw 100px;
  min-height: calc(100vh - 50px);
`

export default function CampaignDetailPage() {
  const { id } = useParams();
  const isLogin = useRecoilValue(loggedInUserId);
  const { status, data, error } = useQuery(
    [GET_DETAILCAMPAIGN],
    () => getCampaignItem(Number(id!), isLogin),
    { cacheTime: 5 }
  );

  return (
    <CampaignDetailRoot>
      <CampaingContainer>
        {data && <CampaignDetail {...data!} />}
      </CampaingContainer>
    </CampaignDetailRoot>
  );
}
