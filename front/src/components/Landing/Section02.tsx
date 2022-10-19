import styled from "styled-components";
import { Container1300 } from "../common/Containers";
import ChartFlexBox from "./ChartFlexBox";


const Section = styled.section`
  background : #192A2E;
  color: #fff;
  padding: 300px 0 200px;
`;


export default function Section02() {
  return (
    <Section id="section02">
      <Container1300>
        <ChartFlexBox />
      </Container1300>
    </Section>
  )
}
