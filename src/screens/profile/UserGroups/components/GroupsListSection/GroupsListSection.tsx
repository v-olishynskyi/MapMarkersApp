/**
 * @namespace GroupsListSection
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { GroupsListSectionProps } from './types';
import { Text, View } from 'react-native';
import { GroupItem } from '@components';
import { GroupModel } from '@models';
import { generalStyles } from '@styles';

/**
 * GroupsListSection
 *
 * @memberof
 * @param {GroupsListSectionProps} params
 *
 * @example
 * // How to use GroupsListSection:
 *  <GroupsListSection />
 */
const GroupsListSection: React.FC<GroupsListSectionProps> = ({
  groups,
  title,
  listEmptyComponents,
}) => {
  const styles = useStyles();

  const renderItem = (group: GroupModel) => {
    return <GroupItem key={group.id} group={group} />;
  };

  return (
    <View>
      <View style={[generalStyles.rowBetween]}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {!groups.length ? listEmptyComponents : groups?.map(renderItem)}
    </View>
  );
};

export default GroupsListSection;
