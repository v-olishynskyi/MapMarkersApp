import React from 'react';
import { Text, View } from 'react-native';
import useStyles from './styles';
import { MenuProps } from './types';
import { MenuItem } from '@components';

const Menu: React.FC<MenuProps> = ({
  items = [],
  style,
  headerText,
  footerText,
  children,
}) => {
  const styles = useStyles();

  return (
    <View style={style}>
      {Boolean(headerText) && (
        <Text style={styles.headerText}>{headerText}</Text>
      )}
      <View style={[styles.container]}>
        {items.map((menuItemProps, index) => {
          const isLast = index === items.length - 1;

          return <MenuItem key={index} isLast={isLast} {...menuItemProps} />;
        })}
        {children}
      </View>
      {Boolean(footerText) && (
        <Text style={styles.footerText}>{footerText}</Text>
      )}
    </View>
  );
};

export default Menu;
