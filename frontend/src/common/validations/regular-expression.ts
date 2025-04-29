export const OnlyLettersWithSpaces = {
  expression: /^[a-zA-ZñÑíóúáé\s]*$/,
  message: 'Solo admite letras y espacios.',
};

export const AlphanumericWithoutSpaces = {
  expression: new RegExp(/^[a-zA-ZñÑ0-9]*$/),
  message: 'Solo admite valores alfanuméricos sin espacios.',
};

export const OnlyNumbers = {
  expression: new RegExp(/^[0-9]*$/),
  message: 'Solo admite valores numéricos sin espacios.',
};

export const TextExceptForNumbers = {
  expression: new RegExp(/^(?!.*\d).*/),
  message: 'Solo admite texto sin valores numéricos.',
};
