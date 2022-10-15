import styled from "styled-components";
import { Container, Container1300 } from "../common/Containers";
import Landing03TextItem from "./Landing03TextItem";
import LandingImgs from "./LandingImgs";
import upcycleIcon from "../../assets/images/icons/icon_upcycle_br.png";
import feedIcon from "../../assets/images/icons/icon_feed_bei.png";
import joinIcon from "../../assets/images/icons/icon_join.png";
import teacherIcon from "../../assets/images/icons/icon_teacher.png";



const TextImgBox = styled.div`
  padding-bottom: 30px;
  margin-bottom: 80px;
`

const UpcycleIconBox =styled.div`
  width:100%;
  height:100px;
  position: relative;
  display:flex;
  align-items:center;
  i{
    display:block;
    width:100%;
    height: 2px;
    background: ${({theme}) => theme.colors.darkBeige};
  }
  > div{
    display:inline-block;
    padding: 10px 50px;
    position: absolute;
    height:100px;
    left: 50%;
    top: 0%;
    transform: translateX(-50%);
    background: ${({theme}) => theme.colors.bodyBg};
  }
`

const ServiceDetailBox = styled.div`

`


export default function Landing03() {
  const imgSize = ["70", "50", "45", "36", "34", "34", "30", "28", "26", "24"];
  const transitionDelay = ["0", ".2", ".4", ".6", ".7", ".8", ".9", "1", "1.1", "1.2"];
  const serviceIcons = [feedIcon, joinIcon, teacherIcon];
  const serviceDescText = [
    "나의 업사이클링 활동을 공유하고\n 다른 사람의 업사이클링 활동을 응원합니다.",
    "다양한 업사이클링 관련 캠페인에 참여하고\n 직접 캠페인을 개최할 수도 있습니다.",
    "실제로 사용가능한 실용적인 업사이클링 제품을\n 만들기 위한 클래스를 제공합니다.",
  ]
  return (
    <Container>
      <Container1300>
        <TextImgBox>
          {LandingImgs.landing03Text.map((ele, idx)=> (
              <Landing03TextItem imgSrc ={ele} imgSize={imgSize[idx]} transitionDelay={transitionDelay[idx]} idx={idx} key={idx + ele} />
            ))}
        </TextImgBox>
        <UpcycleIconBox>
          <i></i>
          <div>
            <img src={upcycleIcon} alt="upcycleIcon" />
          </div>
        </UpcycleIconBox>
        <ServiceDetailBox>
          <div className="title">
            다시, 다 프로젝트
          </div>
          <div className="desc">
            <p>다시, 다 프로젝트는 누구나 쉽게 업사이클링에 접근할 수 있게 도와주는 서비스입니다.</p>
            <p>버려지는 폐자원들에 가치를 더해 새로운 제품으로 재탄생시키고, 필요한 곳에 기부함으로써 환경오염을 개선해나가는 길에 함께합니다.</p>
          </div>
            {serviceIcons.map((ele,idx) =>(
              <div>
                <div>
                  <img src={ele} alt="" />
                </div>
                <div>
                  <div>
                    {serviceDescText[idx]}
                  </div>
                </div>
              </div>
            ))}
        </ServiceDetailBox>
      </Container1300>
    </Container>
  )
}

