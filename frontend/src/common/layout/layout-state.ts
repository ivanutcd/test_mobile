import { create } from 'zustand';
import { PaletteMode } from '@mui/material';

export interface ConfigType {
  basename: string;
  defaultPath: string;
  fontFamily: string;
  borderRadius: number;
}
export const config: ConfigType = {
  basename: '',
  defaultPath: '/',
  fontFamily: `'TT Norms Pro', sans-serif`,
  borderRadius: 12,
};
export interface LayoutState {
  isOpen: string[];
  defaultId: string;
  fontFamily: string;
  borderRadius: number;
  opened: boolean;
  navType?: PaletteMode;
}
export interface LayoutStore extends LayoutState {
  menuOpen: (id: string) => void;
  setMenu: (opened: boolean) => void;
  setFontFamily: (fontFamily: string) => void;
  setBorderRadius: (borderRadius: number) => void;
}

export const useLayoutState = create<LayoutStore>()(set => ({
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  menuOpen: (id: string) => {
    set({ isOpen: [id] });
  },
  setMenu: (opened: boolean) => {
    set({ opened: opened });
  },
  setFontFamily: (fontFamily: string) => {
    set({ fontFamily: fontFamily });
  },
  setBorderRadius: (borderRadius: number) => {
    set({ borderRadius: borderRadius });
  },
}));
