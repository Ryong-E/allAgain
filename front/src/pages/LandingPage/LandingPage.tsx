import styled from "styled-components";
import { Container, Container1300 } from "../../components/common/Containers";
import Landing01 from "../../components/Landing/Landing01";
import Landing02 from "../../components/Landing/Landing02";
import Landing03 from "../../components/Landing/Landing03";
import { NoPaddingContainer } from "../CampaignPage/CampaignPage";


const LandingRoot = styled(NoPaddingContainer)`
  padding: 0;
`

export default function LandingPage() {
  return (
    <LandingRoot>
      <Landing01/>
      <Landing02/>
      <Container1300>
        <Landing03/>
      </Container1300>
    </LandingRoot>
  )
}
