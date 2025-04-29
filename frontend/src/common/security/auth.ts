import { env } from 'environment/env.ts';
import { User, UserManager } from 'oidc-client-ts';

class Auth {
  public userManager: UserManager;

  constructor() {
    console.log(env, 'variables');
    this.userManager = new UserManager(env.STS);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }
  public getAccessToken(): Promise<string> {
    return this.userManager.getUser().then(x => x?.access_token as string);
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect({ state: window.location.href });
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
export default new Auth();
