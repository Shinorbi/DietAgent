import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
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
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
  const borderColor = colorScheme === 'dark' ? '#444' : '#ddd';

  return (
    <TextInput
      style={[
        {
          color: textColor,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        style,
      ]}
      placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
      {...otherProps}
    />
  );
}