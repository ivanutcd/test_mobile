import { createConfig } from '@gluestack-style/react';

export const config = createConfig({
  tokens: {
    colors: {
      primary50: '#e3f2fd',
      primary100: '#bbdefb',
      primary200: '#90caf9',
      primary300: '#64b5f6',
      primary400: '#42a5f5',
      primary500: '#00CDBC', // <-- tu color primario principal
      primary600: '#1e88e5',
      primary700: '#1976d2',
      primary800: '#1565c0',
      primary900: '#0d47a1',
      background: '#ffffff',
      text: '#000000',
      // Puedes agregar más colores personalizados
      danger500: '#ef4444',
      success500: '#22c55e',
    },
    radii: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      full: 9999,
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      '2xl': 30,
    },
    space: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      8: 32,
      10: 40,
    },
    // Puedes extender más tokens aquí
  },
  aliases: {
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
  },
  themes: {
    light: {
      colors: {
        background: '#ffffff',
        text: '#000000',
      },
    },
    dark: {
      colors: {
        background: '#000000',
        text: '#ffffff',
      },
    },
  },
});
