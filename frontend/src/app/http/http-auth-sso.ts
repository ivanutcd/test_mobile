import { HttpAxios } from '@common/http';
import { HeaderApplicationJson } from '@common/http/headers/header-application-json';
import { tokenInterceptor } from './interceptors/token-interceptor.ts';
import { dateInterceptor } from './interceptors/date-interceptor.ts';
import { loadingOverlayInterceptor } from '@components/overlay/loading-overlay-interceptor.ts';
import { env } from '../../environment/env.ts';
import { errorInterceptor } from './interceptors/error-interceptor.ts';

class HttpAuthSSO extends HttpAxios {
  constructor() {
    super({
      baseURL: `${env.BASE_URL_SSO}/auth`,
      headers: HeaderApplicationJson,
    });
  }
  configureInterceptors(): void {
    tokenInterceptor(this.service);
    dateInterceptor(this.service);
    loadingOverlayInterceptor(this.service);
    errorInterceptor(this.service);
  }
}
export const httpAuthSSO = new HttpAuthSSO();
