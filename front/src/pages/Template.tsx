import styled from "styled-components";
import { Container, Container1200, Container1300 } from "../components/common/Containers";

const Button  = styled.div`
  width: 300px;
  height: 200px;
  background: ${(props) => props.theme.bgColor}
`

export default function Template() {
  return (
    <>
      <Container>
        <Button />

      </Container>
    </>
  )
}