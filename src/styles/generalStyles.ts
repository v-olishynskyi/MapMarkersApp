import { ViewStyle } from 'react-native';

type GeneralStyles = {
  row: ViewStyle;
  rowBetween: ViewStyle;
  flex1: ViewStyle;
  rowEnd: ViewStyle;
};

export const generalStyles: GeneralStyles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex1: { flex: 1 },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};
