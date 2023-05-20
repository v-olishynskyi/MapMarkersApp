import { ITheme } from './types';

export const LightTheme: ITheme = {
  dark: false,
  typography: { buttonText: {} },
  colors: { error: '#E00000' },
};

export const DarkTheme: ITheme = {
  ...LightTheme,
  colors: { error: '#E00000' },
};
