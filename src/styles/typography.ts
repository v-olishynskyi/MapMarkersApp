import { human } from 'react-native-typography';
import { ITypography } from 'styles/types';

export const typography: ITypography = {
  bold: {
    largeTitle: {
      ...human.largeTitleObject, // fontSize: 34 lineHeight: 41
      fontWeight: '700',
    },
    body: {
      ...human.bodyObject, // fontSize: 17 lineHeight: 22
      fontWeight: '600',
    },
    callout: {
      ...human.bodyObject, // fontSize: 16 lineHeight: 21
      fontWeight: '600',
    },
    caption1: {
      ...human.caption1Object, // fontSize: 12 lineHeight: 16
      fontWeight: '500',
    },
    caption2: {
      ...human.caption2Object, // fontSize: 11 lineHeight: 13
      fontWeight: '600',
    },
    footnote: {
      ...human.footnoteObject, // fontSize: 13 lineHeight: 18
      fontWeight: '600',
    },
    headline: { ...human.headlineObject, fontWeight: '600' }, // fontSize: 17 lineHeight: 22
    subhead: { ...human.subheadObject, fontWeight: '600' }, // fontSize: 15 lineHeight: 20
    title1: { ...human.title1Object, fontWeight: '700' }, // fontSize: 28 lineHeight: 34
    title2: { ...human.title2Object, fontWeight: '700' }, // fontSize: 22 lineHeight: 28
    title3: { ...human.title3Object, fontWeight: '600' }, // fontSize: 20 lineHeight: 25
  },
  regular: {
    largeTitle: {
      ...human.largeTitleObject, // fontSize: 34 lineHeight: 41
      fontWeight: '400',
    },
    body: {
      ...human.bodyObject, // fontSize: 17 lineHeight: 22
      fontWeight: '400',
    },
    callout: {
      ...human.bodyObject, // fontSize: 16 lineHeight: 21
      fontWeight: '400',
    },
    caption1: {
      ...human.caption1Object, // fontSize: 12 lineHeight: 16
      fontWeight: '400',
    },
    caption2: {
      ...human.caption2Object, // fontSize: 11 lineHeight: 13
      fontWeight: '400',
    },
    footnote: {
      ...human.footnoteObject, // fontSize: 13 lineHeight: 18
      fontWeight: '400',
    },
    headline: { ...human.headlineObject, fontWeight: '600' }, // fontSize: 17 lineHeight: 22
    subhead: { ...human.subheadObject, fontWeight: '400' }, // fontSize: 15 lineHeight: 20
    title1: { ...human.title1Object, fontWeight: '400' }, // fontSize: 28 lineHeight: 34
    title2: { ...human.title2Object, fontWeight: '400' }, // fontSize: 22 lineHeight: 28
    title3: { ...human.title3Object, fontWeight: '400' }, // fontSize: 20 lineHeight: 25
  },
};
