import { StaticCustomization } from '@themes/default/types/customTheme.ts';
import lineaGrafica from '../../../assets/scss/_linea_grafica_vars.module.scss';

export const staticCustomization: StaticCustomization = {
  borderRadius: {
    r1: lineaGrafica.borderRadius1,
    r2: lineaGrafica.borderRadius2,
    r3: lineaGrafica.borderRadius3,
  },
  menu: {
    topMenu: lineaGrafica.topMenu,
  },
};
