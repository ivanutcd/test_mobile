/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { CustomizationThemeOption } from '@themes/default/types/customizationThemeOption.ts';
interface CustomInputMUI {
  marginTop: number;
  marginBottom: number;
  '& > label': {
    top: number;
    left: number;
    color: string; // Puedes ajustar el tipo según tus necesidades
    '&[data-shrink="false"]': {
      top: number;
    };
  };
  '& > div > input': {
    padding: string; // Puedes ajustar el tipo según tus necesidades
  };
  '& legend': {
    display: string; // Puedes ajustar el tipo según tus necesidades
  };
  '& fieldset': {
    top: number;
  };
}
interface CustomMainContent {
  backgroundColor: string; // Puedes ajustar el tipo según tus necesidades
  width: string;
  minHeight: string;
  flexGrow: number;
  padding: string;
  marginTop: string;
  marginRight: string;
  borderRadius?: string; // Puedes ajustar el tipo según tus necesidades
}
export interface CustomTypographyOptions extends TypographyOptions {
  customInput: CustomInputMUI;
  mainContent: CustomMainContent;
  menuCaption: {
    fontSize: string;
    fontWeight: number;
    color: string; // Puedes ajustar el tipo según tus necesidades
    padding: string;
    textTransform: string;
    marginTop?: string; // Opcional, ajusta según tus necesidades
  };
  subMenuCaption: {
    fontSize: string;
    fontWeight: number;
    color: string; // Puedes ajustar el tipo según tus necesidades
    textTransform: string;
  };
  commonAvatar: {
    cursor: string;
    borderRadius: string;
  };
  smallAvatar: {
    width: string;
    height: string;
    fontSize: string;
  };
  mediumAvatar: {
    width: string;
    height: string;
    fontSize: string;
  };
  largeAvatar: {
    width: string;
    height: string;
    fontSize: string;
  };
}

export default function themeTypography(
  theme: CustomizationThemeOption,
): CustomTypographyOptions {
  return {
    fontFamily: theme?.customization?.fontFamily,
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: theme.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: theme.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: theme.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: theme.darkTextSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary,
    },
    button: {
      textTransform: 'none',
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.darkTextSecondary,
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: theme.background,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      // borderRadius: `${theme?.customization?.borderRadius}px`,
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: theme.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem',
    },
    mediumAvatar: {
      width: '32px',
      height: '32px',
      fontSize: '1.2rem',
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem',
    },
  };
}
