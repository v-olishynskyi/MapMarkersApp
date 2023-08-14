import React from 'react';
import { View } from 'react-native';
import useStyles from './styles';
import { MenuProps } from './types';
import { MenuItem } from '@components';

const Menu: React.FC<MenuProps> = ({ items }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {items.map((menuItemProps, index) => {
        const isLast = index === items.length - 1;

        return <MenuItem key={index} isLast={isLast} {...menuItemProps} />;
      })}
    </View>
  );
};

export default Menu;
