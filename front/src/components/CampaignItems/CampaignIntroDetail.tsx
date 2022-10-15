import styled from "styled-components"

const IntroBox = styled.div`
  padding : 40px 50px;
  margin-top: 15px;
  background:${({theme}) => theme.colors.white};
  box-shadow: ${({theme})=> theme.boxShadowDefault};
  border: 1px solid rgba(231,225,210,.8);
  .introTitle{
    font-weight:600;
    font-size:20px;
    margin-bottom: 20px;
  }
  .introDescDetail{
    line-height:1.5;
  }
`

interface IntroDetail{
  desc: String;
}

export default function CampaignIntroDetail({desc} : IntroDetail) {
  return (
    <IntroBox>
      <div className="introTitle">
        캠페인 소개
      </div>
      <div className="introDescDetail">
        {desc.includes('\n') ? desc.split('\n').map((ele,idx) => (
          <p key={ele + idx + Date.now()}>{ele}</p>
        )):
        <p>{desc} </p>
      }
      </div>
    </IntroBox>
  )
}
