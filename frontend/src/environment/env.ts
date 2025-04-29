/* eslint-disable */
import { createVirtualPATH, withBaseName } from './virtualPath.ts';
import { UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';

export interface JsEnv {
  APP_URL: string;
  BASE_URL_API: string;
  BASE_URL_SSO: string;
  BASE_URL_CONTRATOS: string;
  VERSION: string;
  SYSTEM_NAME: string;
  CLIENT_ID: string;
  CLIENT_SCOPE: string;
  IDLE_TIMEOUT: number;
  BASE_URL_CATALOGO: string;
}
const jsEnv: JsEnv = (window as any)._env_;

const VIRTUAL_PATH = createVirtualPATH(jsEnv);

const sts: UserManagerSettings = {
  authority: `${jsEnv.BASE_URL_SSO}`,
  client_id: `${jsEnv.CLIENT_ID}`,
  redirect_uri: `${jsEnv.APP_URL}/redirect`,
  scope: jsEnv.CLIENT_SCOPE,
  post_logout_redirect_uri: `${jsEnv.APP_URL}/`,
  response_type: 'code',
  automaticSilentRenew: true,
  silent_redirect_uri: `${jsEnv.APP_URL}/silent`,
  userStore: new WebStorageStateStore({ store: localStorage }),
  loadUserInfo: true,
};

export const env = {
  ...jsEnv,
  BASENAME: withBaseName(VIRTUAL_PATH),
  PUBLIC_URL: VIRTUAL_PATH,
  STS: sts,
};
