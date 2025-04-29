import { ThemeOptions } from '@mui/material/styles';
import { CustomTypographyOptions } from '@themes/default/typography.ts';
import { Breakpoints } from '@mui/system/createTheme/createBreakpoints';

import { CustomPaletteOptions } from '@themes/default/types/customPaletteOptions.ts';
export interface StaticCustomization {
  borderRadius: {
    r1: string;
    r2: string;
    r3: string;
  };

  menu: {
    topMenu: string;
  };
}
export interface CustomTheme extends ThemeOptions {
  palette: CustomPaletteOptions;
  typography: CustomTypographyOptions;
  breakpoints: Breakpoints;
  custom: StaticCustomization;
}
