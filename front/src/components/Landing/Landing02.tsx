import styled from "styled-components"
import { Container1300 } from "../common/Containers"
import ChartFlexBox from "./ChartFlexBox"
import IsKnow from "./IsKnow"


const Section = styled.section`
  background : linear-gradient(#192A2E  , #264142, #2E4D4D, #395757 );
  color: #fff;
  padding: 300px 0 300px ;
`
/* #192A2E */


export default function Landing02() {
  return (
    <Section id="section02">
      <Container1300>
        <ChartFlexBox />
        <IsKnow/>
      </Container1300>
    </Section>
  )
}
