import { Theme } from '@react-navigation/native';
import { TextStyle } from 'react-native';

export type ITheme = Theme & {
  dark: boolean;
  colors: IColors;
  typography: ITypography;
};

export type IColors = Theme['colors'] & {
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
};

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

export type Typographies = {
  largeTitle: TextStyle;
  title1: TextStyle;
  title2: TextStyle;
  title3: TextStyle;
  headline: TextStyle;
  body: TextStyle;
  callout: TextStyle;
  subhead: TextStyle;
  footnote: TextStyle;
  caption1: TextStyle;
  caption2: TextStyle;
};

export interface ITypography {
  bold: Typographies;
  regular: Typographies;
}
