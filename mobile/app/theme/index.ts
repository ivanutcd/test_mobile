import { config } from './gluestack-style.config';

const customConfig = {
  ...config,
  tokens: {
    ...config.tokens,

    // 🎨 COLORES PERSONALIZADOS
    colors: {
      ...config.tokens.colors,
      primary: {
        50: '#e3f2f9',
        100: '#c5e4f3',
        200: '#a2d4ec',
        300: '#7ac1e4',
        400: '#47a9da',
        500: '#00CDBC',  // main blue
        600: '#057bb5',
        700: '#0369a1',
        800: '#05567b',
        900: '#014f86',
      },
      background: '#F9FAFB',
      text: '#111827',
      muted: '#6B7280',
      success: '#22C55E',
      error: '#EF4444',
      warning: '#F59E0B',
    },

    // 🔤 FUENTES PERSONALIZADAS
    fonts: {
      heading: 'Inter_700Bold',
      body: 'Inter_400Regular',
      mono: 'Courier',
    },

    fontWeights: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    // 🟦 RADIOS GLOBAL (BOTONES, INPUTS, ETC.)
    radii: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
  },

  // ✨ OPCIONAL: ESTILOS POR DEFECTO PARA COMPONENTES
  components: {
    Button: {
      defaultProps: {
        variant: 'solid',
        size: 'md',
        borderRadius: '10',
      },
      variants: {
        solid: {
          bg: '$primary.500',
          borderRadius: '$lg',
          _text: {
            fontWeight: '$bold',
            color: '$white',
          },
          _pressed: {
            bg: '$primary.600',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        size: 'md',
      },
      variants: {
        outline: {
          borderColor: '$primary.500',
          borderRadius: '$md',
          _focus: {
            borderColor: '$primary.600',
            shadow: '0 0 0 1px $primary.500',
          },
        },
      },
    },
  },
};

export default customConfig;
