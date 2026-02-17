import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ThemedButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export function ThemedButton({
  onPress,
  children,
  style,
  textStyle,
  disabled = false,
}: ThemedButtonProps) {
  const colorScheme = useColorScheme();
  
  const defaultButtonStyle: ViewStyle = {
    backgroundColor: disabled ? '#ccc' : (colorScheme === 'dark' ? '#333' : '#f0f0f0'),
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const defaultTextStyle: TextStyle = {
    color: disabled ? '#888' : (colorScheme === 'dark' ? '#fff' : '#000'),
    fontSize: 16,
    fontWeight: '600',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[defaultButtonStyle, style]}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {typeof children === 'string' ? (
        <Text style={[defaultTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}