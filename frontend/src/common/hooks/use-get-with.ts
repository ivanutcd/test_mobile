import { useAxiosWith } from '@common/hooks/use-axios-with.ts';
import { URLUtils } from '@common/http/url-utils.ts';
import { useState } from 'react';
import { ConfigParams } from './models/config-params';
import { UseAxiosResult } from 'axios-hooks';
import { HttpAxios } from '@common/http';
import { Get } from './models/get';

export const useGetWith = <T>(
  instance: HttpAxios,
  { url, params }: Get,
  configParams?: Partial<ConfigParams>,
): UseAxiosResult<T> => {
  const onLoad = configParams?.onLoad;
  const overrideConfig = configParams?.overrideConfig;
  //const { onLoad, overrideConfig } = configParams;

  const withOnLoad = onLoad != undefined ? !onLoad : false;
  const [manual] = useState<boolean>(withOnLoad);

  const [extraConfig] = useState(overrideConfig ? overrideConfig : {});
  const newUrl = URLUtils.buildUrlWithQueryString(url, params ?? {});

  return useAxiosWith(instance)<T>(
    { url: newUrl, ...extraConfig },
    { useCache: false, manual: manual },
  );
};
