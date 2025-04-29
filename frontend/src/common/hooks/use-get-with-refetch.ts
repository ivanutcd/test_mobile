import { useAxiosWith } from '@common/hooks/use-axios-with.ts';
import { URLUtils } from '@common/http/url-utils.ts';
import { useState } from 'react';
import { ConfigParams } from './models/config-params';
import { UseAxiosResult } from 'axios-hooks';
import { HttpAxios } from '@common/http';
import { Get } from './models/get';

export const useGetWithRefetch = <T>(
  instance: HttpAxios,
  { url, params }: Get,
  configParams?: Partial<ConfigParams>,
): [UseAxiosResult<T>, () => void] => {
  const onLoad = configParams?.onLoad;
  const overrideConfig = configParams?.overrideConfig;

  const [manual] = useState<boolean>(
    !((onLoad != undefined && onLoad) || true),
  );

  const [extraConfig] = useState(overrideConfig ? overrideConfig : {});
  const newUrl = URLUtils.buildUrlWithQueryString(url, params ?? {});

  const axiosResult = useAxiosWith(instance)<T>(
    { url: newUrl, ...extraConfig },
    { useCache: false, manual: manual },
  );

  const refetch = () => {
    axiosResult[1]();
  };

  return [axiosResult, refetch];
};
