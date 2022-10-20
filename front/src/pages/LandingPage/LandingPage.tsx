import styled from "styled-components";
import { Container } from "../../components/common/Containers";
import Section01 from "../../components/Landing/Section01";
import Section02 from "../../components/Landing/Section02";
import Section03 from "../../components/Landing/Section03";
import Section04 from "../../components/Landing/Section04";

const LandingRoot = styled(Container)`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
`;

export default function LandingPage() {

  return (
    <LandingRoot>
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
    </LandingRoot>
  )
}
