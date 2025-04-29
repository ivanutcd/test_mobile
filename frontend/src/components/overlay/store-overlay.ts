import { create } from 'zustand';

interface OverlayStore {
  open: boolean;
  openOverlay(): void;
  closeOverlay(): void;
}

export const useOverlayState = create<OverlayStore>()(set => ({
  open: false,
  openOverlay() {
    set({ open: true });
  },
  closeOverlay() {
    set({ open: false });
  },
}));
