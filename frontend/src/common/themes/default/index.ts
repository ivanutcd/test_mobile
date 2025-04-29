import { createTheme } from '@mui/material/styles';
import { esES as esESDataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/material/locale';
// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride.ts';
import themePalette from './palette.ts';
import themeTypography from './typography.ts';
import { LayoutState } from '@layout/layout-state.ts';
import { CustomThemeOption } from '@themes/default/types/customThemeOption.ts';
import { CustomizationThemeOption } from '@themes/default/types/customizationThemeOption.ts';
import { CustomTheme } from '@themes/default/types/customTheme.ts';
import { staticCustomization } from '@layout/customization/custom.ts';

export const Theme = (customization: LayoutState) => {
  const color = colors;

  const themeOption: CustomizationThemeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization,
  };

  const themeOptions: CustomThemeOption = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes: any = createTheme(themeOptions, esES);

  themes.components = {
    ...componentStyleOverrides(themeOption, staticCustomization),
    ...esESDataGrid.components,
  };

  return { ...themes, custom: staticCustomization } as CustomTheme;
};
