/**
 * @namespace MarkerImages
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { observer } from 'mobx-react-lite';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Modal,
  View,
} from 'react-native';
import { Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { openPicker } from 'react-native-image-crop-picker';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';
import { PublicFileModel } from '@models';
import Image from 'react-native-image-progress';
import Carousel from 'react-native-ui-lib/carousel';
import ActionSheet from 'react-native-ui-lib/actionSheet';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { ImageZoomComponent } from '../';

/**
 * MarkerImages
 *
 * @example
 * // How to use MarkerImages:
 *  <MarkerImages />
 */
const MarkerImages: React.FC = () => {
  const styles = useStyles();
  const { colors } = getTheme();

  const {
    markersStore: { editableMarker: marker },
  } = useStores();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState<
    number | null
  >(null);
  const [showImageViewer, setShowImageViewer] = React.useState<boolean>(false);
  const [imageViewerIndex, setImageViewerIndex] = React.useState<number | null>(
    null,
  );

  const images = marker?.images.items || [];
  console.log('images:', images);

  const imageUrls = images.map<IImageInfo>(img => ({ url: img.url }), []);

  const handleAddImage = React.useCallback(async () => {
    const file = await openPicker({ mediaType: 'photo' });
    const id = (images.length + 1).toString();
    marker?.addTemporaryImage(id, file);
  }, [marker, images.length]);

  const handleDeleteImage = (index: number) => {
    marker?.images.remove(index);
  };
  const onDismissActionSheet = () => setSelectedImageIndex(null);

  const handlePressViewImage = () => {
    setImageViewerIndex(selectedImageIndex);
    setShowImageViewer(true);
  };

  const renderItem = React.useCallback(
    ({ item: { id, url }, index }: ListRenderItemInfo<PublicFileModel>) => {
      const loader = (
        <View style={[styles.image, styles.imageLoader]}>
          <ActivityIndicator />
        </View>
      );

      const onPress = () => setSelectedImageIndex(index);

      return url ? (
        <Pressable onPress={onPress}>
          <Image
            key={id}
            source={{ uri: url }}
            style={styles.image}
            renderIndicator={() => loader}
          />
        </Pressable>
      ) : (
        loader
      );
    },
    [styles.image, styles.imageLoader],
  );

  const renderHeader = React.useCallback(
    () => (
      <Pressable
        style={[styles.image, styles.addImage]}
        onPress={handleAddImage}>
        <Icon
          name="add-circle-outline"
          color={colors.text}
          size={32}
          style={styles.addImageIcon}
        />
      </Pressable>
    ),
    // eslint-disable-next-line
    [styles.image, styles.addImage, handleAddImage, colors.text],
  );

  const actionSheetOptions = [
    {
      label: 'Перегляд',
      onPress: handlePressViewImage,
    },
    {
      label: 'Видалити',
      onPress: () => handleDeleteImage(selectedImageIndex!),
    },
    { label: 'Закрити' },
  ];

  return (
    <>
      <FlatList
        horizontal
        style={styles.images}
        contentContainerStyle={styles.content}
        data={images}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        showsHorizontalScrollIndicator={false}
        keyExtractor={image => image.id}
      />
      <ActionSheet
        visible={!!selectedImageIndex}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        useNativeIOS
        options={actionSheetOptions}
        onDismiss={onDismissActionSheet}
      />
      <Modal visible={showImageViewer} transparent animationType="slide">
        <Carousel
          onChangePage={() => console.log('page changed')}
          horizontal
          initialPage={imageViewerIndex || 0}
          pageHeight={SCREEN_HEIGHT}
          containerStyle={{ flex: 1 }}>
          {images.map(img => {
            return (
              // <Image
              //   source={{ uri: img.url }}
              //   style={{ width: '80%', height: '80%' }}
              // />
              <ImageZoomComponent key={img.url} uri={img.url} />
              // <ImageZoom
              //   key={img.id}
              //   uri={img.url}
              //   minScale={0.5}
              //   style={{ overflow: 'hidden' }}
              //   maxScale={3}
              //   onInteractionStart={() => console.log('Interaction started')}
              //   onInteractionEnd={() => console.log('Interaction ended')}
              //   onPinchStart={() => console.log('Pinch gesture started')}
              //   onPinchEnd={() => console.log('Pinch gesture ended')}
              //   onPanStart={() => console.log('Pan gesture started')}
              //   onPanEnd={() => console.log('Pan gesture ended')}
              //   // renderLoader={() => <ActivityIndicator />}
              //   // resizeMode="cover"
              // />
            );
          })}
        </Carousel>
      </Modal>
    </>
  );
};

export default observer(MarkerImages);
