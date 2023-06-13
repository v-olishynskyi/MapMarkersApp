/**
 * @namespace Onboarding
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, Carousel } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamsList } from '@navigation';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { globalStorage } from '@utils/Storage';

const Step: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const styles = useStyles();

  const widthShared = useSharedValue(8);

  const width = useAnimatedStyle(() => ({
    width: widthShared.value,
  }));

  React.useEffect(() => {
    widthShared.value = withTiming(isActive ? 30 : 8, {
      duration: 100,
      easing: Easing.linear,
    });
  }, [isActive, widthShared]);

  return <Animated.View style={[styles.step, width]} />;
};

/**
 * Onboarding
 *
 *
 * @memberof Onboarding
 *
 * @example
 * // How to use Onboarding:
 *  <Onboarding />
 */
const Onboarding: React.FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamsList>>();
  const styles = useStyles();

  const [step, setStep] = React.useState(0);
  const [carouselWrapperHeight, setCarouselWrapperHeight] = React.useState(100);

  const steps = [
    {
      title: 'Знайди своє місце 1',
      subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 1',
    },
    {
      title: 'Знайди своє місце 2',
      subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 2',
    },
    {
      title: 'Знайди своє місце 3',
      subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 3',
    },
  ];

  const isLast = step === steps.length - 1;

  const handlePressNext = () =>
    isLast ? onPressSignUp() : setStep(prev => prev + 1);
  const onPressSignIn = () => {
    globalStorage.set('is-visited-onboarding', true);
    return navigate('sign-in');
  };
  const onPressSignUp = () => {
    globalStorage.set('is-visited-onboarding', true);
    return navigate('sign-in');
  };

  const renderStep = React.useCallback(
    (_, index) => {
      const isActive = index === step;

      return <Step key={index} isActive={isActive} />;
    },
    [step],
  );

  const carousel = (
    <Carousel
      onChangePage={index => setStep(index)}
      containerStyle={{ height: carouselWrapperHeight }}>
      {steps.map((item, index) => (
        <React.Fragment key={index}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.subtitle}</Text>
        </React.Fragment>
      ))}
    </Carousel>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentStyles}>
      <Image
        source={require('../../../assets/images/onboarding.jpeg')}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <View
          style={{ flex: 1 }}
          onLayout={e => setCarouselWrapperHeight(e.nativeEvent.layout.height)}>
          {carousel}
        </View>
        <View style={styles.stepper}>{steps.map(renderStep)}</View>
        <Button
          label={isLast ? 'Створити аккаунт' : 'Далі'}
          onPress={handlePressNext}
          style={styles.button}
        />
        <Button
          link
          label={'Вже маєте аккаунт? Увійти'}
          onPress={onPressSignIn}
        />
      </View>
    </ScrollView>
  );
};

export default Onboarding;
