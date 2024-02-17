/**
 * @namespace EditableMarkerImages
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
  View,
} from 'react-native';
import { ImageViewer, Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { openPicker } from 'react-native-image-crop-picker';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';
import { PublicFileModel } from '@models';
import Image from 'react-native-image-progress';
import ActionSheet from 'react-native-ui-lib/actionSheet';

/**
 * EditableMarkerImages
 *
 * @example
 * // How to use EditableMarkerImages:
 *  <EditableMarkerImages />
 */
const EditableMarkerImages: React.FC = () => {
  const styles = useStyles();
  const { colors } = getTheme();

  const {
    markersStore: { editableMarker: marker },
  } = useStores();

  const [selectedImageIndex, setSelectedImageIndex] = React.useState<
    number | null
  >(null);

  const imageViewerRef = React.useRef<ImageViewer>(null);

  const images = marker?.images.items || [];

  const imageUrls = images.map(img => img.url, []);

  const handleAddImage = React.useCallback(async () => {
    const file = await openPicker({ mediaType: 'photo' });
    const id = (images.length + 1).toString();
    marker?.addTemporaryImage(id, file);
  }, [marker, images.length]);

  const handleDeleteImage = (index: number) => {
    marker?.images.remove(index);
  };
  const onDismissActionSheet = () => setSelectedImageIndex(null);

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
      onPress: () => imageViewerRef.current?.show(selectedImageIndex!),
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
        visible={selectedImageIndex !== null}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        useNativeIOS
        options={actionSheetOptions}
        onDismiss={onDismissActionSheet}
      />
      {Boolean(imageUrls.length) && (
        <ImageViewer images={imageUrls} ref={imageViewerRef} />
      )}
    </>
  );
};

export default observer(EditableMarkerImages);
