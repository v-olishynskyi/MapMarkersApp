/**
 * @namespace ImageViewerWrapper
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ImageViewerRef, ImageViewerProps } from './types';
import { Modal, View } from 'react-native';
import Carousel from 'react-native-ui-lib/carousel';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ResponsiveImage } from './components';
import { IconButton } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ImageViewer
 *
 * @memberof
 * @param {ImageViewerProps} params
 *
 * @example
 * // How to use ImageViewer:
 *  <ImageViewerWrapper />
 */
const ImageViewer = React.forwardRef<ImageViewerRef, ImageViewerProps>(
  ({ images }, ref) => {
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
            {images.map(uri => (
              <ResponsiveImage key={uri} uri={uri} />
            ))}
          </View>
        </Carousel>
      </Modal>
    );
  },
);

export default ImageViewer;
declare type ImageViewer = ImageViewerRef;
