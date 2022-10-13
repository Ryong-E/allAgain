import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    boxShadowDefault: string,

    fontSizes: {
      bodyText: string,
      placeholder: string,
    },
    colors: {
      bodyBg: string,
      bodyText: string,
      placeholder: string,
      error: string,
      dasidaGreen: string,
      lightGreen: string,
      white: string,
      lightBeige: string,
      darkBeige: string, 
      brown: string,
    },
    borderRadius: {
      small: string,
      large: string,
    },


  }
}