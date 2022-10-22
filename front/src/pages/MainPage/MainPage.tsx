import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMainCampaignList, getMainFeedList } from "../../api/mainApi";
import MainContentsSlide from "../../components/Main/MainContentsSlide";
import MainContentsSlide2 from "../../components/Main/MainContentsSlide2";
import MainTop from "../../components/Main/MainTop";

const Root = styled.div`
  min-height: calc(100vh - 70px);
  padding-bottom: 100px;
`
const Container = styled.div`
  width:100%;
  padding : 30px 0 100px;
`
export default function MainPage() {
  // const {status : feedStatus, data : feedData, error : feedError} = useQuery(["MainFeedList"], getMainFeedList);
  // const {status : campStatus, data : campData, error : campError} = useQuery(["MainCampList"], getMainCampaignList);
  // console.log(feedData);
  // console.log(campData);

  return (
    <Root>
      <MainTop />
      <MainContentsSlide />
      <MainContentsSlide2 />
    </Root>
  )
}

