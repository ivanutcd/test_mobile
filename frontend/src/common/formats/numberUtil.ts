const nav = navigator as any;
const userLocale = nav.userLanguage || nav.language;

export class NumberUtil {
  // Formato estándar con dígitos fijos
  static format(
    number?: number,
    digitos: number = 2,
    locale?: string,
  ): string | undefined {
    return number?.toLocaleString(locale ?? userLocale, {
      maximumFractionDigits: digitos,
      minimumFractionDigits: digitos,
    });
  }

  static formatWithoutDecimals(
    number?: number,
    digitos?: number,
    locale?: string,
  ): string | undefined {
    return number?.toLocaleString(locale ?? userLocale, {
      maximumFractionDigits: digitos,
      minimumFractionDigits: digitos,
    });
  }

  // Formato abreviado
  static compactFormat(
    number?: number,
    digitos?: number,
    locale?: string,
  ): string {
    if (number === 0 || number === undefined) {
      return '0';
    }

    const units = ['', 'K', 'M', 'MM'];
    const unitIndex = Math.min(
      units.length - 1,
      Math.floor(Math.log10(number) / 3),
    );

    const compactNumber = number / Math.pow(1000, unitIndex);

    return `${NumberUtil.format(compactNumber, digitos, locale)} ${
      units[unitIndex]
    }`;
  }

  // Métodos específicos de formato con moneda o abreviado
  static lempirasFormat(
    number?: number,
    abreviado: boolean = false,
  ): string | undefined {
    if (abreviado) {
      return `L${this.compactFormat(number)}`;
    } else {
      return `L${this.format(number)}`;
    }
  }

  static dollarFormat(
    number?: number,
    abreviado: boolean = false,
  ): string | undefined {
    if (abreviado) {
      return `$${this.compactFormat(number)}`;
    } else {
      return `$${this.format(number)}`;
    }
  }

  static euroFormat(
    number?: number,
    abreviado: boolean = false,
  ): string | undefined {
    if (abreviado) {
      return `€ ${this.compactFormat(number)}`;
    } else {
      return `€ ${this.format(number)}`;
    }
  }
}
