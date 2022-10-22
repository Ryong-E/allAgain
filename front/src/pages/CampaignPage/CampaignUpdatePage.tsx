import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCampaignItem } from "../../api/campaignApi";
import CampaignForm from "../../components/CampaignItems/CampaignForm";
import { Container, Container1300 } from "../../components/common/Containers";

export default function CampaignUpdatePage() {
  const { id } = useParams();
  const { isLoading, data } = useQuery(
    ["userCampaign"],
    () => getCampaignItem(Number(id!)),
    { cacheTime: 0 }
  );
  return (
    <>
      {isLoading ? (
        <div style={{ height: "100vh" }}></div>
      ) : (
        <Container>
          <Container1300>
            {data && <CampaignForm {...data} updateMod={true} />}
          </Container1300>
        </Container>
      )}
    </>
  );
}
