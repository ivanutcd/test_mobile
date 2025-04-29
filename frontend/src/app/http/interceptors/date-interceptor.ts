/* eslint-disable no-restricted-syntax,no-param-reassign,no-redeclare */

import { DateTime } from 'luxon';
import { AxiosInstance } from 'axios';

const isoDateFormat =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

const dateFormat =
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

const convertDateTime = (value: any) => {
  // new Date(moment(value).utc().add(-moment().utcOffset(), 'minutes').unix() * 1000);
  const result = DateTime.fromISO(value).toJSDate();

  return result;
};

const convertDate = (value: any) => {
  // new Date(moment(value).utc().add(-moment().utcOffset(), 'minutes').unix() * 1000);
  const result = DateTime.fromFormat(
    `${value} 00:00:00`,
    'yyyy-MM-dd HH:mm:ss',
  ).toJSDate();

  return result;
};

function isIsoDateString(value: any): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value);
}
function isDateString(value: any): boolean {
  return value && typeof value === 'string' && dateFormat.test(value);
}

const handleDates = (body: any): void => {
  if (body === null || body === undefined || typeof body !== 'object') return;

  for (const key of Object.keys(body)) {
    const value = body[key];

    if (isDateString(value)) body[key] = convertDate(value);
    else if (isIsoDateString(value)) body[key] = convertDateTime(value);
    else if (typeof value === 'object') handleDates(value);
  }
};
export const dateInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(originalResponse => {
    handleDates(originalResponse.data);
    return originalResponse;
  });
};
