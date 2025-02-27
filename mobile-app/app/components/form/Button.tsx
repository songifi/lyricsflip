import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ButtonProps } from '@/app/types/all_types';

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  primary = true, 
  disabled = false, 
  isFullWidth = true
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        {width: isFullWidth ? '100%' : '50%'}
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          primary ? styles.primaryButtonText : styles.secondaryButtonText,
          disabled && styles.disabledButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  disabledButton: {
    backgroundColor: 'rgba(165, 90, 243, 0.5)',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.Inter
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: Colors.light.primary,
  },
  disabledButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Button;
