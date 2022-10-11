import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

  * {
    box-sizing: border-box;
  }

  html,
  body {
    background: ${(props) => props.theme.colors.bodyBg};
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.bodyText};
    font-weight: 400;
    line-height: 1.5;
    color: ${(props) => props.theme.colors.bodyText};

  }
`

export default GlobalStyle;