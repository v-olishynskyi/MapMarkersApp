import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CustomButton } from '../buttons';
import { CustomTextInput } from '../inputs';
import Modal from 'react-native-modal';
import { LatLng } from 'react-native-maps';
import * as MobX from 'mobx-react-lite';

type NewMarkerModalProps = {
  visible: boolean;
  onDismiss: () => void;
  handlePressSave: () => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  name: string;
  description?: string;
  coordinates: string;
  handleChangeName: (name: string) => void;
  handleChageDescription: (description: string) => void;
  handleChangeCoordinates: (coordinates: LatLng) => void;
};

export const NewMarkerModal = ({
  visible,
  onDismiss,
  handlePressSave,
  loading,
  disabled,
  handleChangeName,
  handleChageDescription,
  handleChangeCoordinates,
  name,
  description,
  coordinates,
}: NewMarkerModalProps) => {
  return (
    <MobX.Observer
      render={() => (
        // <Overlay
        //   isVisible={visible}
        //   onBackdropPress={onDismiss}
        //   overlayStyle={styles.container}>
        // <Text style={{ fontSize: 24, textAlign: 'center' }}>
        //   Введіть інформацію стосовно данного маркера
        // </Text>
        // <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
        //   <CustomTextInput
        //     label={`Назва*`}
        //     placeholder={`Назва`}
        //     labelStyle={{ color: 'gray' }}
        //     inputStyle={{ borderWidth: 1 }}
        //     onChangeText={() => {}}
        //   />
        //   <CustomTextInput
        //     label={`Опис`}
        //     placeholder={`Опис`}
        //     labelStyle={{ color: 'gray' }}
        //     inputStyle={{ borderWidth: 1 }}
        //     onChangeText={() => {}}
        //   />
        //   <CustomButton
        //     title="Зберегти"
        //     buttonStyle={{ marginVertical: 16 }}
        //     onPress={handlePressSave}
        //     loading={loading}
        //     disabled={disabled}
        //   />
        // </View>
        // </Overlay>
        <Modal
          isVisible={visible}
          onBackdropPress={onDismiss}
          animationIn="fadeIn"
          animationOut="fadeOut">
          <View
            style={{ backgroundColor: '#fff', padding: 16, borderRadius: 16 }}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>
              Введіть інформацію стосовно данного маркера
            </Text>
            <View style={{ paddingHorizontal: 8, marginTop: 20 }}>
              <CustomTextInput
                label={`Назва*`}
                placeholder={`Назва`}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ borderWidth: 1 }}
                onChangeText={handleChangeName}
                value={name}
              />
              <CustomTextInput
                label={`Опис`}
                placeholder={`Опис`}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ borderWidth: 1 }}
                onChangeText={handleChageDescription}
                value={description}
              />
              <CustomTextInput
                label={`Координати`}
                placeholder={`Координати`}
                labelStyle={{ color: 'gray' }}
                inputStyle={{
                  borderWidth: 1,
                }}
                // onChangeText={handleChangeCoordinates}
                value={coordinates}
                multiline
              />
              <CustomButton
                title="Зберегти"
                buttonStyle={{ marginVertical: 16 }}
                onPress={handlePressSave}
                loading={loading}
                disabled={disabled}
              />
            </View>
          </View>
        </Modal>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 16 },
});
