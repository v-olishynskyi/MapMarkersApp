import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CustomButton } from '../buttons';
import { Input } from '../inputs';
import Modal from 'react-native-modal';
import { LatLng } from 'react-native-maps';
import * as MobX from 'mobx-react-lite';
import RNPickerSelect from 'react-native-picker-select';

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
  handleChangeCategoryValue: (value: any, index: number) => void;
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
  handleChangeCategoryValue,
  name,
  description,
  coordinates,
}: NewMarkerModalProps) => {
  return (
    <MobX.Observer
      render={() => (
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
              <Input
                label={`Назва*`}
                placeholder={`Назва`}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ borderWidth: 1 }}
                onChangeText={handleChangeName}
                value={name}
              />
              <Input
                label={`Опис`}
                placeholder={`Опис`}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ borderWidth: 1 }}
                onChangeText={handleChageDescription}
                value={description}
              />
              <Input
                label={`Категорія*`}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ borderWidth: 1 }}
                InputComponent={() => (
                  <RNPickerSelect
                    onValueChange={handleChangeCategoryValue}
                    placeholder={{ label: 'Інше', value: '1' }}
                    items={[
                      { label: 'Football', value: 'football' },
                      { label: 'Baseball', value: 'baseball' },
                      { label: 'Hockey', value: 'hockey' },
                    ]}
                    style={{
                      viewContainer: {
                        width: '100%',
                        height: '100%',
                        borderWidth: 1,
                        borderColor: '#000',
                        paddingVertical: 16,
                        borderRadius: 8,
                        paddingLeft: 16,
                      },
                      placeholder: { fontSize: 16 },
                    }}
                  />
                )}
              />

              <Input
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
