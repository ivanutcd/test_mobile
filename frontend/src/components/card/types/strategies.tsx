import { CardVariantStyles } from './card-props';
import colors from '../../../assets/scss/_themes-vars.module.scss';
import vars from '../../../assets/scss/_linea_grafica_vars.module.scss';

export const getStrategies = (baseColor: string): CardVariantStyles => {
  const bgColorOptions =
    baseColor === 'yellow'
      ? vars.secundaryBackgroundCard //la variable fue eliminada, por eso se usa linea_grafica_vars
      : baseColor === 'blue'
        ? vars.primaryBackgroundCard //la variable fue eliminada, por eso se usa linea_grafica_vars
        : baseColor === 'aqua'
          ? colors.blue
          : undefined;

  const btnIconColorOptions =
    baseColor === 'yellow'
      ? '#E78618 !important'
      : baseColor === 'blue'
        ? '#0482B8 !important'
        : baseColor === 'aqua'
          ? `${colors.blueIcons} !important`
          : undefined;

  return {
    light: {
      fontColor: colors.grey550,
      backgroundColor: colors.white,
      buttonIconColor:
        baseColor === 'yellow'
          ? colors.yellowBackgroundIcons
          : baseColor === 'blue'
            ? '#D2EFFC'
            : baseColor === 'aqua'
              ? colors.blueBackground
              : undefined,
    },
    single: {
      fontColor: colors.white,
      backgroundColor: bgColorOptions,
      buttonIconColor: btnIconColorOptions,
    },
    multiple: {
      fontColor: colors.white,
      backgroundColor: bgColorOptions,
      buttonIconColor: btnIconColorOptions,
    },
  };
};
