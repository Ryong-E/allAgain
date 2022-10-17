import styled from "styled-components"
import MainContentsSlide from "../../components/Main/MainContentsSlide"

const Root = styled.div`
  min-height: calc(100vh - 70px);
  padding-top : 70px;
`
const Container = styled.div`
  width:100%;
  padding : 0 100px;
`
export default function MainPage() {
  return (
    <Root>
      <Container>
        <MainContentsSlide/>
      </Container>
    </Root>
  )
}

