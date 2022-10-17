import styled from 'styled-components'
const CampaignContentsBox = styled.div`
border: 1px solid rgba(231,225,210,.8);
box-shadow: ${({theme})=> theme.boxShadowDefault};
background:${({theme})=> theme.colors.white};
text-align:center;
padding:80px 60px;
& h1{
  font-size:32px;
  font-weight:500;
}
& h2{
  font-size:28px;
  font-weight:500;
}
& h3{
  font-size:24px;
  font-weight:400;
}
& h4{
  font-size:20px;
  font-weight:400;
}
& ul{
  list-style:inside;
  list-style-type: disc;
}
& ol{
  list-style:inside;
  list-style-type: decimal;
}
& strong{
  font-weight:bold;
}
& em{
  font-style:italic;
}
`

interface Children {
  children ?: JSX.Element[] | JSX.Element
}

export default function CampaignContents({children}:Children) {
  return (
    <CampaignContentsBox>{children}</CampaignContentsBox>
  )
}
