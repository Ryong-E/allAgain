import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { getMainCampaignList, getMainFeedList } from "../../api/mainApi"
import MainContentsSlide from "../../components/Main/MainContentsSlide"

const Root = styled.div`
  min-height: calc(100vh - 70px);
  padding-top : 70px;
`
const Container = styled.div`
  width:100%;
  padding : 30px 0 100px;
`
export default function MainPage() {
  const {status : feedStatus, data : feedData, error : feedError} = useQuery(["MainFeedList"], getMainFeedList);
  const {status : campStatus, data : campData, error : campError} = useQuery(["MainCampList"], getMainCampaignList);
  // console.log(feedData)
  console.log(campData)
  return (
    <Root>
      <Container>
        <MainContentsSlide/>
        <MainContentsSlide/>
      </Container>
    </Root>
  )
}

