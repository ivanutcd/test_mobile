import { PaletteOptions, TypeText } from '@mui/material';

interface CommonColors {
  black: string;
  white: string;
}
export interface CustomPaletteOptions extends PaletteOptions {
  common: CommonColors;
  text?: Partial<TypeText & { dark: string; hint: string }>;
  orange: Partial<{
    light: string;
    main: string;
    dark: string;
  }>;
  dark: Partial<{
    light: string;
    main: string;
    dark: string;
    800: string;
    900: string;
  }>;
}
