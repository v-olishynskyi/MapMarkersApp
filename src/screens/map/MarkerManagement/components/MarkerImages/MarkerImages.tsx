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
  ListRenderItem,
  Modal,
  View,
} from 'react-native';
import { Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { openPicker } from 'react-native-image-crop-picker';
import { IS_IOS, getTheme, showToast } from '@common/helpers';
import { useStores } from '@store';
import { FilesService } from '@services';
import { faker } from '@faker-js/faker';
import { PublicFileModel } from '@models';
import Image from 'react-native-image-progress';
import { ActionSheet, Carousel } from 'react-native-ui-lib';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const { top, bottom } = useSafeAreaInsets();

  const {
    markersStore: { editableMarker: marker },
  } = useStores();

  const [selectedImageId, setSelectedImageId] = React.useState('');
  const [showImageViewer, setShowImageViewer] = React.useState<boolean>(false);
  const [imageViewerIndex, setImageViewerIndex] = React.useState<number>(0);

  const images = marker?.images.items || [];

  const imageUrls = images.map<IImageInfo>(img => ({ url: img.url }), []);

  const handleAddImage = React.useCallback(async () => {
    const temporaryId = faker.string.uuid();

    try {
      const file = await openPicker({ mediaType: 'photo' });

      marker?.addImage(temporaryId);

      let formData = new FormData();
      formData.append('file', {
        name: file.filename || 'filename',
        type: file.mime,
        uri: IS_IOS ? file.path?.replace('file://', '') : file.path,
      } as unknown as Blob);

      const response = await FilesService.uploadFile(formData);

      marker?.replaceImage(temporaryId, response);
    } catch (error: any) {
      showToast('error', error?.message || error);

      const temporaryImageIndex = marker?.images.items.findIndex(
        item => item.id === temporaryId,
      );
      if (temporaryImageIndex !== undefined) {
        marker?.images.remove(temporaryImageIndex);
      }
    }
  }, [marker]);

  const handleDeleteImage = (id: string) => {
    const index = marker?.images.items.findIndex(el => el.id === id);

    if (index === undefined) {
      return;
    }

    marker?.images.remove(index);
  };

  const onDismissActionSheet = () => setSelectedImageId('');

  const renderItem: ListRenderItem<PublicFileModel> = React.useCallback(
    ({ item: { id, url } }) => {
      const loader = (
        <View style={[styles.image, styles.imageLoader]}>
          <ActivityIndicator />
        </View>
      );

      return url ? (
        <Pressable onPress={() => setSelectedImageId(id)}>
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
      onPress: () => {
        const imageIndex = images.findIndex(
          image => image.id === selectedImageId,
        );
        if (imageIndex !== undefined) {
          setImageViewerIndex(imageIndex);
        }

        setShowImageViewer(true);
      },
    },
    {
      label: 'Видалити',
      onPress: () => handleDeleteImage(selectedImageId),
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
        visible={!!selectedImageId}
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
          initialPage={imageViewerIndex}
          pageHeight={SCREEN_HEIGHT}
          containerStyle={{ flex: 1 }}>
          {images.map(img => {
            return (
              // <Image
              //   source={{ uri: img.url }}
              //   style={{ width: '80%', height: '80%' }}
              // />
              <ImageZoomComponent uri={img.url} />
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
