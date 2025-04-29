import { DateTime } from 'luxon';

export class URLUtils {
  static queryStringToObject<T>(url: string): T {
    const queryString = url.split('?')[1];
    const params = new URLSearchParams(queryString);
    const result: any = {};

    params.forEach((value, key) => {
      if (value.trim().length > 0) {
        if (!isNaN(Number(value))) {
          result[key] = Number(value);
        } else {
          result[key] = value;
        }
      }
    });

    return result as T;
  }

  static toQueryString = (params: any): string => {
    const searchParams = new URLSearchParams();
    for (const key of Object.keys(params)) {
      const param = params[key];
      if (Array.isArray(param)) {
        for (const p of param) {
          searchParams.append(key, p);
        }
      } else {
        searchParams.append(key, param);
      }
    }
    return searchParams.toString();
  };

  static buildParams = (params: any) => {
    if (params) {
      for (const key in params) {
        params[key] =
          params[key] instanceof Date
            ? DateTime.fromJSDate(params[key] as Date).toISO()
            : params[key];

        if (
          params[key] === '' ||
          params[key] === '' ||
          params[key] === undefined ||
          params[key] === null ||
          params[key]?.length === 0
        ) {
          delete params[key];
        }
      }
      return Object.keys(params).length > 0 ? params : undefined;
    }
    return undefined;
  };

  static buildArraysParams = (search: any) => {
    if (!search) return '';

    const params = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          params.append(key, item);
        });
      } else params.append(key, value as any);
    });

    return params.toString();
  };
  static buildUrlWithQueryString = (url: string, params: any) => {
    function hasPropertiesWithValues() {
      return Object.keys(params).length > 0;
    }

    if (params) {
      const newParams = this.buildParams(params);
      const queryString = hasPropertiesWithValues()
        ? `?${this.buildArraysParams(newParams)}`
        : '';
      return `${url}${queryString}`;
    }
    return url;
  };
}
