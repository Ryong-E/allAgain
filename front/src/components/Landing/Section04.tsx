import styled from "styled-components";
import LandingTextImgItem from "./LandingTextImgItem";
import LandingImgs from "./LandingImgs";
import upcycleIcon from "../../assets/images/icons/icon_upcycle_light.png";
import feedIcon from "../../assets/images/icons/icon_feed_bei.png";
import joinIcon from "../../assets/images/icons/icon_join.png";
import teacherIcon from "../../assets/images/icons/icon_teacher.png";
import { Link } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useEffect } from "react";
import { animateFrom, hide } from "../../utils/animateFrom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container1300 } from "../common/Containers";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  padding: 0 0 100px;
`;

const TextImgBox = styled.div`
  padding-bottom: 30px;
`;

const UpcycleIconBox =styled.div`
  width:100%;
  height:158px;
  position: relative;
  display:flex;
  align-items:center;
  justify-content:center;
  margin : 150px 0;
  i{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 50%;
    display:block;
    width:100%;
    height: 2px;
    background: #E7DFCB;
  }
  > div{
    position:relative;
    z-index: 2;
    display:inline-block;
    padding: 0 50px;
    background: ${({theme}) => theme.colors.bodyBg};
  }
`;

export const ServiceDetailBox = styled.div`
  text-align:center; 
  margin-bottom: 200px;
`;

const TitleBox = styled.div`
  font-size: 40px;
  font-family: 'RIDIBatang';

`;

const DescBox = styled.div`
  margin: 150px 0 200px;
  font-size: 20px;
  line-height: 2;

  p{
    + p{
      padding-top : 20px;
    }
  }
`;

const ContentBox = styled.div`
  display:flex;
  font-size: 17px;
  color: #6A6558;
  justify-content:space-around;
  .innerBox{

    .imgBox{
      margin-bottom: 50px;
      img{
        max-width:80%;
      }
    }
    .contentTextBox{
      
      p{
        + p{
          padding-top:10px;
        }
      }
    }
  }
`;

const GoToServiceButton = styled.div`
  position: relative;
  background: #004D49;
  transition: background .3s;

  &:after {
    content: "";
    position: absolute;
    top: calc(50% - 0.5em);
    left: calc(50% + 11em);
    opacity: 0;
    transition: opacity .5s, left .5s;
    width: 0;
    height: 0;
    border-left: 1em solid #004D49;
    border-top: .6em solid transparent;
    border-bottom: .6em solid transparent;
  }

  &:hover {
    background: #F9F7F2;
  }

  &:hover:after {
    left: calc(50% + 12em);
    opacity: 1;
  }

  a {
    display: block;
    width: 100%;
    padding: 70px 0;
    font-size: 20px;
    color: #88A7AE;
    text-align: center;
    border: 2px solid transparent;
    transition: padding .5s;
    
    &:visited {
      color: #88A7AE;
    }

    &:hover {
      color: #004D49;
      border: 2px solid #004D49;
      padding: 70px 40px 70px 0;
    }



  }



`;


export default function Section04() {
  const transitionDelay = ["0", ".2", ".4", ".6", ".7", ".8", ".9", "1", "1.1", "1.2"];
  const serviceInnerItem = [
    {
      icon : feedIcon,
      descText : "나의 업사이클링 활동을 공유하고\n 다른 사람의 업사이클링 활동을 응원합니다."
    },
    {
      icon : joinIcon,
      descText : "다양한 업사이클링 관련 캠페인을 통해\n 기부에 참여하여 사회적 가치를 추구합니다."
    },
    {
      icon : teacherIcon,
      descText : "실제로 사용 가능한 실용적인 업사이클링 제품을\n 만들기 위한 클래스를 제공합니다."
    },
  ];

  
  return (
    <Section id="section04">
      <Container1300>
        <TextImgBox>
          {LandingImgs.upcyclingArticleText.map((ele, idx)=> (
              <LandingTextImgItem className={`gs_reveal gs_reveal_fromBottom delay${idx % 2 ? 400 : 200}`} imgSrc ={ele} idx={idx} key={idx + ele} />
            ))}
        </TextImgBox>
        <UpcycleIconBox>
          <i></i>
          <div>
            <img src={upcycleIcon} alt="upcycleIcon" />
          </div>
        </UpcycleIconBox>
        <ServiceDetailBox>
          <TitleBox className="gs_reveal gs_reveal_fromTop delay600">
              다시, 다 프로젝트
          </TitleBox>
          <DescBox className="gs_reveal gs_reveal_fromTop delay600">
            <p>다시, 다 프로젝트는 업사이클링을 조금 더 쉽게 접할 수 있도록 도와주는 서비스입니다.</p>
            <p>버려지는 폐자원에 가치를 더해 새로운 제품으로 재탄생시키고, 필요한 곳에 기부함으로써 환경오염을 개선해나가는 길에 함께합니다.</p>
          </DescBox>
          <ContentBox>
            {serviceInnerItem.map(({icon, descText}, idx) =>(
              <div className={`innerBox gs_reveal gs_reveal_fromTop delay${400 + idx*400}`} key={icon + descText}>
                <div className="imgBox">
                  <img src={icon} alt="serviceIcon" />
                </div>
                <div className="contentTextBox">
                  {descText.split("\n").map((ele,idx) => (
                    <p key={idx + ele} >{ele}</p>
                  ))}
                </div>
              </div>
            ))}
          </ContentBox>
        </ServiceDetailBox>
        <GoToServiceButton>
          <Link to={ROUTE.HOME.link}>버려진 제품에 가치를 더하는 방법 알아보기</Link>
        </GoToServiceButton>
      </Container1300>
    </Section>
  )
}

