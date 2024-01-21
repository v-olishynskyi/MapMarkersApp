/**
 * @namespace ImageViewerWrapper
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ImageViewerRef, ImageViewerWrapperProps } from './types';
import { Modal, View } from 'react-native';
import Carousel from 'react-native-ui-lib/carousel';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ResponsiveImage } from './components';
import { IconButton } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ImageViewerWrapper
 *
 * @memberof
 * @param {ImageViewerWrapperProps} params
 *
 * @example
 * // How to use ImageViewerWrapper:
 *  <ImageViewerWrapper />
 */
const ImageViewerWrapper = React.forwardRef<
  ImageViewerRef,
  ImageViewerWrapperProps
>(({ images }, ref) => {
  const styles = useStyles();
  const { top, bottom } = useSafeAreaInsets();

  const [visible, setVisible] = React.useState(false);
  const [viewedImageIndex, setViewedImageIndex] = React.useState(0);

  const closeModal = () => setVisible(false);

  React.useImperativeHandle(ref, () => ({
    show: index => {
      if (index !== undefined) {
        setViewedImageIndex(index);
      }

      setVisible(true);
    },
  }));

  const header = (
    <View style={styles.headerContainer}>
      <IconButton
        icon={<Icon name="close-outline" color={'white'} size={40} />}
        style={styles.iconContainer}
        onPress={closeModal}
      />
    </View>
  );

  return (
    <Modal animationType="fade" transparent visible={visible}>
      {header}
      <Carousel
        initialPage={viewedImageIndex}
        pageHeight={SCREEN_HEIGHT - top - bottom}
        showCounter
        containerStyle={styles.carousel}>
        <View style={styles.carousel}>
          {images.map(({ uri }) => (
            <ResponsiveImage key={uri} uri={uri} />
          ))}
        </View>
      </Carousel>
    </Modal>
  );
});

export default ImageViewerWrapper;
export declare type ImageViewerHandlers = ImageViewerRef;
