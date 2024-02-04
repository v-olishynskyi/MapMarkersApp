/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { observer } from 'mobx-react-lite';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Users, Groups } from './screens';

const renderScene = SceneMap({
  users: Users,
  groups: Groups,
});

/**
 * CommunityTab
 *
 *
 * @memberof
 * @param {CommunityTabProps} params
 *
 * @example
 * // How to use Community:
 *  <CommunityTab />
 */
const CommunityTab: React.FC = () => {
  const styles = useStyles();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'groups', title: 'Користувачі' },
    { key: 'users', title: 'Групи' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={styles.container}
    />
  );
};

export default observer(CommunityTab);
