import { useEffect } from 'react';
import { UserManager } from 'oidc-client-ts';
import { env } from 'environment/env';

export const Silent = () => {
  const load = () => {
    const config = {
      ...env.STS,
      response_mode: 'query',
    };
    const mgr = new UserManager(config as any);
    mgr.signinSilentCallback().catch(err => {
      console.log(err, 'error silent redirect call back');
    });
  };
  useEffect(() => {
    load();
  }, []);
  return <div></div>;
};
