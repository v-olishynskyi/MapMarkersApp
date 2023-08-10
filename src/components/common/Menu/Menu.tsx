import React from 'react';
import { View } from 'react-native';
import useStyles from './styles';

const Menu: React.FC<React.PropsWithChildren> = ({ children }) => {
  const styles = useStyles();

  return <View style={styles.container}>{children}</View>;
};

export default Menu;
