import React from 'react';
import Input from './Input';
import { fireEvent, render } from '@testing-library/react-native';

const fn = jest.fn;

const TestedInput = props => {
  return <Input {...props} />;
};

describe('Text Input', () => {
  test('render correctly', () => {
    const { findByTestId } = render(
      <TestedInput
        testId="text-input-renders-correctly"
        value="test value"
        onChangeText={fn}
      />,
    );

    const inputByTestId = findByTestId('text-input-renders-correctly');
    expect(inputByTestId).toBeTruthy();
  });

  test('render correctly and finded by value', async () => {
    const { findByPlaceholderText } = render(
      <TestedInput
        placeholder="Test placeholder"
        value="test value"
        onChangeText={fn}
      />,
    );

    const inputByTestValue = await findByPlaceholderText('Test placeholder');
    expect(inputByTestValue.props.value).toBe('test value');
  });

  test('render correctly and fire event', async () => {
    const { findByPlaceholderText } = render(
      <TestedInput
        placeholder="text-input-renders-correctly-and-fire-event"
        value="test value"
      />,
    );

    const input = await findByPlaceholderText(
      'text-input-renders-correctly-and-fire-event',
    );
    fireEvent.changeText(input, 'test value edited');
    expect(input.props.value).toBe('test value edited');
  });
});
