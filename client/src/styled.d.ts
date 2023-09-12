import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      mainBlue: string;
      subBlue: string;
      darkBlue: string;
      skyBlue: string;
      paleBlue: string;
      red: string;
    };
    textColors: {
      gray00: string;
      gray10: string;
      gray30: string;
      gray40: string;
      gray50: string;
      gray60: string;
      primary: string;
      secondary: string;
    };
    lineColors: {
      coolGray90: string;
      coolGray80: string;
    };
    shadow: {
      onlyBottom: string;
      dp01: string;
      dp02: string;
      dp03: string;
      dp04: string;
      inset: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      bold: number;
      extrabold: number;
    };
    fontSize: {
      s12h18: SerializedStyles;
      s14h21: SerializedStyles;
      s16h24: SerializedStyles;
      s18h27: SerializedStyles;
      s20h30: SerializedStyles;
    };
  }
}
