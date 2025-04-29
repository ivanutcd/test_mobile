import { LayoutState } from '@layout/layout-state.ts';

export interface CustomizationThemeOption {
  colors: CSSModuleClasses;
  heading: string;
  paper: string;
  backgroundDefault: string;
  background: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
  customization: LayoutState;
}
