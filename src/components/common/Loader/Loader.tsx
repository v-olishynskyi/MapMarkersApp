import React from 'react';
import { getTheme } from '@common/helpers';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import useStyles from './styles';

const Loader: React.FC<ActivityIndicatorProps> = props => {
  const {} = getTheme();
  const styles = useStyles();

  return <ActivityIndicator {...props} style={styles.loader} />;
};

export default Loader;
