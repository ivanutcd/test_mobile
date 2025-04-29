import { useEffect } from 'react';
import { UserManager } from 'oidc-client-ts';
import { env } from 'environment/env';

export const Redirect = () => {
  const load = () => {
    const config = {
      ...env.STS,
      response_mode: 'query',
    };
    const mgr = new UserManager(config as any);
    mgr.signinRedirectCallback().then(
      user => {
        window.history.replaceState(
          {},
          window.document.title,
          window.location.origin,
        );
        (window as any).location = user.state || '/';
      },
      error => {
        console.error(error);
        if (
          error.message &&
          error.message === 'No matching state found in storage'
        ) {
          (window as any).location = '/';
        }
      },
    );
  };

  useEffect(() => {
    load();
  }, []);
  return <div></div>;
};
