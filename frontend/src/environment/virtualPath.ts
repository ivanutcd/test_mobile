// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { JsEnv } from './env.ts';

export const createVirtualPATH = (env: JsEnv) => {
  const host: URL = new URL(env.APP_URL);

  const baseUrl: string =
    host.protocol + '//' + host.hostname + (host.port ? ':' + host.port : '');

  const result = env.APP_URL.replace(baseUrl, '');
  return result;
};

export const withBaseName = (url: string) => {
  return url === '' || url === undefined ? '/' : url;
};
