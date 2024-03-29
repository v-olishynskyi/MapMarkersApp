/**
 * @namespace AnimatedImageLibrary
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { AnimatedImageLibraryProps } from './types';
import { ListRenderItemInfo, Modal, Text } from 'react-native';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';
import {
  FastImageProgress,
  IconButton,
  ImageViewer,
  Pressable,
} from '@components';
import Animated, {
  SlideInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ImageStack } from './components';
import { generalStyles } from '@styles';

/**
 * AnimatedImageLibrary
 *
 * @memberof
 * @param {AnimatedImageLibraryProps} params
 *
 * @example
 * // How to use AnimatedImageLibrary:
 *  <AnimatedImageLibrary images={['https://url-to-image.com']} />
 */
const AnimatedImageLibrary: React.FC<AnimatedImageLibraryProps> = ({
  containerStyle,
  images,
}) => {
  const { colors } = getTheme();
  const {
    markersStore: { activeMarker },
  } = useStores();
  const styles = useStyles();

  const [isShowModal, setIsShowModal] = React.useState(false);

  const imageViewerRef = React.useRef<ImageViewer>(null);

  const showModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  const handlePressStack = () =>
    images.length > 1 ? showModal() : imageViewerRef.current?.show();

  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const modalHeaderAnimatedStyle = useAnimatedStyle(() => {
    const borderBottomColor =
      scrollOffset.value > 0 ? colors.border : 'transparent';

    return {
      borderBottomColor,
    };
  });

  const modalHeader = (
    <Animated.View
      style={[styles.modalHeaderContainer, modalHeaderAnimatedStyle]}>
      <Text style={styles.modalHeaderTitle} numberOfLines={1}>
        {activeMarker?.name}
      </Text>
      <IconButton icon="close" onPress={closeModal} />
    </Animated.View>
  );

  const renderImage = React.useCallback(
    ({ item: url, index }: ListRenderItemInfo<string>) => (
      <Animated.View
        style={[styles.imageMiniatureContainer]}
        entering={SlideInDown}>
        <Pressable
          style={generalStyles.flex1}
          onPress={() => imageViewerRef.current?.show(index)}>
          <FastImageProgress
            source={{ uri: url }}
            style={styles.imageMiniature}
            resizeMode="cover"
          />
        </Pressable>
      </Animated.View>
    ),
    [styles.imageMiniature, styles.imageMiniatureContainer],
  );

  return (
    <>
      <ImageStack
        containerStyle={containerStyle}
        images={images}
        onPress={handlePressStack}
      />
      {images.length > 1 ? (
        <Modal visible={isShowModal} transparent animationType={'fade'}>
          <Animated.View style={[styles.modalContainer]}>
            {modalHeader}
            <Animated.FlatList
              columnWrapperStyle={styles.flatListCol}
              onScroll={scrollHandler}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              numColumns={2}
              data={images}
              renderItem={renderImage}
            />
          </Animated.View>
          <ImageViewer ref={imageViewerRef} images={images} />
        </Modal>
      ) : (
        <ImageViewer ref={imageViewerRef} images={images} />
      )}
    </>
  );
};

export default AnimatedImageLibrary;
