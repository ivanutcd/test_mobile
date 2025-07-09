import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { config as themeConfig } from '../../../gluestack-style.config';

const Chip = ({ text, color, isActive }: { text: string, color: 'primary' | 'secondary' | 'success' | 'error' | 'warning', isActive: boolean }) => {
  const colors = {
    primary: themeConfig.themes.light.colors.primary,
    secondary: themeConfig.themes.light.colors.background,
    success: themeConfig.themes.light.colors.success,
    error: themeConfig.themes.light.colors.error,
    warning: themeConfig.themes.light.colors.warning,
    info: themeConfig.themes.light.colors.info,
  };

  const chipStyle = isActive ? [styles.chip, styles.active, { backgroundColor:  colors[color]     }] : [styles.chip, styles.inactive, { backgroundColor: colors[color] }];

  return (
    <View style={chipStyle}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  chip: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 0,
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

export default Chip;
