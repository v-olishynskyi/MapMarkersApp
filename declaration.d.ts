import 'react-native-svg';
import { PathProps } from 'react-native-svg';

declare module '*.png';
declare module '*.svg';

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    pathProps?: PathProps;
  }
}
