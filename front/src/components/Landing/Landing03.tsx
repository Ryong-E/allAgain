import styled from "styled-components";
import LandingTextImgItem from "./LandingTextImgItem";
import LandingImgs from "./LandingImgs";
import upcycleIcon from "../../assets/images/icons/icon_upcycle_light.png";
import feedIcon from "../../assets/images/icons/icon_feed_bei.png";
import joinIcon from "../../assets/images/icons/icon_join.png";
import teacherIcon from "../../assets/images/icons/icon_teacher.png";



const Section = styled.section`

`

const TextImgBox = styled.div`
  padding-bottom: 30px;
`

const UpcycleIconBox =styled.div`
  width:100%;
  height:158px;
  position: relative;
  display:flex;
  align-items:center;
  justify-content:center;
  margin : 200px 0;
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
`

export const ServiceDetailBox = styled.div`
  text-align:center; 
`
const TitleBox = styled.div`
  font-size: 40px;
`
const DescBox = styled.div`
  margin: 150px 0 200px;
  font-size: 18px;
  p{
    color: ${({theme}) => theme.colors.dasidaGreen};
    + p{
      padding-top : 20px;
    }
  }

`
const ContentBox = styled.div`
  display:flex;
  font-size: 17px;
  justify-content:space-around;
  .innerBox{

    .imgBox{
      margin-bottom: 50px;
    }
    .contentTextBox{
      
      p{
        + p{
          padding-top:10px;
        }
      }
    }
  }
`


export default function Landing03() {
  const transitionDelay = ["0", ".2", ".4", ".6", ".7", ".8", ".9", "1", "1.1", "1.2"];
  const serviceInnerItem = [
    {
      icon : feedIcon,
      descText : "나의 업사이클링 활동을 공유하고\n 다른 사람의 업사이클링 활동을 응원합니다."
    },
    {
      icon : joinIcon,
      descText : "다양한 업사이클링 관련 캠페인에 참여하고\n 직접 캠페인을 개최할 수도 있습니다."
    },
    {
      icon : teacherIcon,
      descText : "실제로 사용가능한 실용적인 업사이클링 제품을\n 만들기 위한 클래스를 제공합니다."
    },
  ]
  
  return (
    <Section id="section03">
      <TextImgBox>
        {LandingImgs.section03Text.map((ele, idx)=> (
            <LandingTextImgItem imgSrc ={ele} transitionDelay={transitionDelay[idx]} idx={idx} key={idx + ele} />
          ))}
      </TextImgBox>
      <UpcycleIconBox>
        <i></i>
        <div>
          <img src={upcycleIcon} alt="upcycleIcon" />
        </div>
      </UpcycleIconBox>
      <ServiceDetailBox>
        <TitleBox>
            다시, 다 프로젝트
        </TitleBox>
        <DescBox>
          <p>다시, 다 프로젝트는 누구나 쉽게 업사이클링에 접근할 수 있게 도와주는 서비스입니다.</p>
          <p>버려지는 폐자원들에 가치를 더해 새로운 제품으로 재탄생시키고, 필요한 곳에 기부함으로써 환경오염을 개선해나가는 길에 함께합니다.</p>
        </DescBox>
        <ContentBox>
          {serviceInnerItem.map(({icon, descText}) =>(
            <div className="innerBox" key={icon + descText}>
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
    </Section>
  )
}

