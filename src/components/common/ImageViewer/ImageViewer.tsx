/**
 * @namespace ImageViewerWrapper
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ImageViewerRef, ImageViewerProps } from './types';
import { Modal, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { AnimatedHeader, ResponsiveImage } from './components';
import { StatusBar } from '@components';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import { useSharedValue } from 'react-native-reanimated';

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

    const [visible, setVisible] = React.useState(false);
    const [viewedImageIndex, setViewedImageIndex] = React.useState(0);
    const [isShowStatusBar] = React.useState(true);

    const isShowHeaderSharedValue = useSharedValue(true);

    const closeModal = () => setVisible(false);

    const onScrollEnd = (index: number) => {
      setViewedImageIndex(index);
    };

    const renderItem = ({ item: url }: CarouselRenderItemInfo<string>) => (
      <View style={styles.imageContainer}>
        <ResponsiveImage uri={url} />
      </View>
    );

    React.useImperativeHandle(ref, () => ({
      show: index => {
        if (index !== undefined) {
          setViewedImageIndex(index);
        }

        setVisible(true);
      },
    }));

    return (
      <Modal animationType="fade" transparent visible={visible}>
        <StatusBar hidden={isShowStatusBar} />
        <AnimatedHeader
          isShow={isShowHeaderSharedValue}
          currentIndex={viewedImageIndex + 1}
          numberOfAllItems={images.length}
          onBack={closeModal}
        />
        <View style={styles.carousel}>
          <Carousel
            defaultIndex={viewedImageIndex}
            loop
            data={images}
            renderItem={renderItem}
            vertical={false}
            width={SCREEN_WIDTH}
            style={styles.carousel}
            onScrollEnd={onScrollEnd}
          />
        </View>
      </Modal>
    );
  },
);

export default ImageViewer;
declare type ImageViewer = ImageViewerRef;
