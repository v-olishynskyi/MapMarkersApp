import { useStores } from '@store';
import React from 'react';
import { Modal, Text, View } from 'react-native';
import useStyles from './styles';

const LostConnectionScreen: React.FC = () => {
  const styles = useStyles();
  const {
    appStore: { isOnline, isInitializingApp },
  } = useStores();

  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      visible={!isOnline && !isInitializingApp}>
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>connection lost</Text>
      </View>
    </Modal>
  );
};

export default LostConnectionScreen;
