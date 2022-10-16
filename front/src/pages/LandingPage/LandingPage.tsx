import { Container, Container1300 } from "../../components/common/Containers";
import Landing01 from "../../components/Landing/Landing01";
import Landing03 from "../../components/Landing/Landing03";
import { NoPaddingContainer } from "../CampaignPage/CampaignPage";



export default function LandingPage() {
  return (
    <NoPaddingContainer>
      <Landing01/>
      <Container1300>
        <Landing03/>
      </Container1300>
    </NoPaddingContainer>
  )
}
