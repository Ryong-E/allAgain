import styled from 'styled-components'

const CampaignContentsBox = styled.div`
border: 1px solid rgba(231,225,210,.8);
box-shadow: ${({theme})=> theme.boxShadowDefault};
background:${({theme})=> theme.colors.white};
`

interface Children {
  children ?: JSX.Element[] | JSX.Element
}

export default function CampaignContents({children}:Children) {
  return (
    <CampaignContentsBox>{children}</CampaignContentsBox>
  )
}
