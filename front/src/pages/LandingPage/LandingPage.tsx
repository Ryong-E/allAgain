import styled from "styled-components";
import { Container1300 } from "../../components/common/Containers";
import Section01 from "../../components/Landing/Section01";
import Section02 from "../../components/Landing/Section02";
import Section03 from "../../components/Landing/Section03";
import Section04 from "../../components/Landing/Section04";
import { NoPaddingContainer } from "../CampaignPage/CampaignPage";

const LandingRoot = styled(NoPaddingContainer)`
  padding: 0;
`;

export default function LandingPage() {

  return (
    <LandingRoot>
      <Section01 />
      <Section02 />
      <Section03 />
      <Container1300>
        <Section04 />
      </Container1300>
    </LandingRoot>
  )
}
