import { ThemeOptions } from '@mui/material/styles';
import { CustomTypographyOptions } from '@themes/default/typography.ts';

import { CustomPaletteOptions } from '@themes/default/types/customPaletteOptions.ts';

export interface CustomThemeOption extends ThemeOptions {
  typography: CustomTypographyOptions;
  pallete?: CustomPaletteOptions;
}
