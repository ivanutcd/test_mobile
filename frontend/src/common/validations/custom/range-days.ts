import * as yup from 'yup';

export function rangeDays(
  this: yup.DateSchema,
  fieldDate: string,
  msg?: string,
  days: number = 1,
) {
  return this.test({
    name: 'rangeDays',
    message: msg ? msg : `Rango supera la cantidad de ${days} dias permitidos`,
    test: (value, context) => {
      if (value && context.parent[fieldDate]) {
        const dateContext = context.parent[fieldDate];
        if (dateContext && dateContext?.toString() !== 'Invalid Date') {
          const diff = value.diffDays(dateContext);
          if (diff) return diff <= days;
          else return false;
        }
      }
      return true;
    },
  });
}
