import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCampaignItem } from "../../api/campaignApi";
import CampaignForm from "../../components/CampaignItems/CampaignForm";
import { Container, Container1300 } from "../../components/common/Containers";

export default function CampaignUpdatePage() {
  const { id } = useParams();
  const { isLoading, data } = useQuery(["userCampaign"], () =>
    getCampaignItem(Number(id!))
  );
  console.log(data,"패칭데이터")
  return (
    <>
      <Container>
        <Container1300>
          {data !== undefined && <CampaignForm {...data} updateMod={true} />}
        </Container1300>
      </Container>
    </>
  );
}
