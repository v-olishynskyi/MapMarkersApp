export type ITheme = {
  dark: boolean;
  colors: IColors;
};

export interface IColors {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  mint: string;
  teal: string;
  cyan: string;
  blue: string;
  indigo: string;
  purple: string;
  pink: string;
  brown: string;
  gray: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
  gray6: string;
  white: string;
  black: string;

  background: {
    primary: string;
    secondary: string;
  };
}

type SpacingNames =
  | 's1'
  | 's2'
  | 's3'
  | 's4'
  | 's5'
  | 's6'
  | 's7'
  | 's8'
  | 's9'
  | 's10'
  | 's11';

export type SpacingBase = Record<SpacingNames, number>;
