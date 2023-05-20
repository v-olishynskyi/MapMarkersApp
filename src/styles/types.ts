import { TextStyle } from 'react-native';

export type ITypography = {
  buttonText: TextStyle;
};

export type ITheme = {
  typography: ITypography;
  dark: boolean;
  colors: IColors;
};

export interface IColors {
  error: string;
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
