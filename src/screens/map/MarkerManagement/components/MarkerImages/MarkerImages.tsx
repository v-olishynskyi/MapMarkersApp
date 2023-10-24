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

  const images = marker?.images.items || [];

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

  const renderItem: ListRenderItem<PublicFileModel> = React.useCallback(
    ({ item: { id, url } }) => {
      const loader = (
        <View style={[styles.image, styles.imageLoader]}>
          <ActivityIndicator />
        </View>
      );

      return url ? (
        <Image
          key={id}
          source={{ uri: url }}
          style={styles.image}
          renderIndicator={() => loader}
        />
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
        <Icon name="add-circle-outline" color={colors.text} size={32} />
      </Pressable>
    ),
    [styles.image, styles.addImage, handleAddImage, colors.text],
  );

  console.log('images', images);

  return (
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
  );
};

export default observer(MarkerImages);
