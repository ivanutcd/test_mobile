import { makeUseAxios, UseAxios } from 'axios-hooks';

import { HttpAxios } from '@common/http';

type miType = (instance: HttpAxios) => UseAxios;
export const useAxiosWith: miType = instance =>
  makeUseAxios({ axios: instance.service, cache: false });
