/**
 * @namespace Avatar
 * @category
 * @subcategory
 *  */
import React from 'react';
import { Image, Text, View } from 'react-native';
import { AvatarProps } from './types';
import useStyles from './styles';
import RNUiLibAvatar from 'react-native-ui-lib/avatar';
import Modal from 'react-native-modal';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { useStores } from '@store';
import { Pressable } from '@components';
import { Size } from '@common/types';

/**
 * Avatar
 *
 * @memberof SharedComponents
 * @param {AvatarProps} params
 *
 * @example
 * // How to use Avatar:
 *  <Avatar url={'https://url-to-image.com/avatar.png} fullname="Filrsname Lastname" initials="FL" size={40} />
 */
const Avatar: React.FC<AvatarProps> = ({
  url,
  fullname,
  initials,
  size = 64,
  ...rest
}) => {
  const {
    uiStore: { isPortrait },
  } = useStores();

  const styles = useStyles();
  const [showBigImage, setShowBigImage] = React.useState(false);

  const openModal = () => setShowBigImage(true);
  const closeModal = () => setShowBigImage(false);

  const [imageSize, setImageSize] = React.useState<Size>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (url) {
      const width = WINDOW_WIDTH - 32;
      const height = width * (isPortrait ? 16 / 9 : 9 / 16);
      setImageSize({ height, width });
    }
  }, [url, isPortrait]);

  return (
    <>
      <RNUiLibAvatar
        animate
        label={initials}
        useAutoColors
        name={fullname}
        source={{
          uri: url || undefined,
        }}
        size={size}
        onPress={() => (url ? openModal() : null)}
        {...rest}
      />
      {showBigImage && (
        <Modal
          onSwipeComplete={closeModal}
          useNativeDriverForBackdrop
          swipeDirection={['down']}
          isVisible={showBigImage}
          onDismiss={closeModal}
          onBackdropPress={closeModal}>
          <>
            <View style={styles.actions}>
              <Pressable onPress={closeModal}>
                <Text style={styles.closeButton}>X</Text>
              </Pressable>
            </View>
            <View style={styles.avatarModalContainer}>
              <Image
                source={{ uri: url || '' }}
                style={[styles.bigAvatar, { ...imageSize }]}
              />
            </View>
          </>
        </Modal>
      )}
    </>
  );
};

export default Avatar;
