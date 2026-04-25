import { Colors } from '@/constants/theme';
import { TextInput, TextInputProps } from 'react-native';

type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextInputProps) {
  return (
    <TextInput
      style={[
        {
          color: Colors.light.text,
          backgroundColor: Colors.light.background,
          borderColor: '#ddd',
        },
        style,
      ]}
      placeholderTextColor='#999'
      {...otherProps}
    />
  );
}
