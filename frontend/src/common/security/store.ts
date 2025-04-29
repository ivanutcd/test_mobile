import { create } from 'zustand';
import { UserProfile } from 'oidc-client-ts';
import auth from './auth';

export interface User {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  idNumber: string;
  isExternal: boolean;
  resetPassword?: boolean;
}
interface SessionStore {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  saveSession: (
    accessToken?: string,
    refreshToken?: string,
    user?: UserProfile,
  ) => void;
  logout: (accessToken?: string, refreshToken?: string, user?: User) => void;
  login: () => void;
}

export const useSessionState = create<SessionStore>()(set => ({
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  saveSession(accessToken, refreshToken, user) {
    const x = user as UserProfile;
    set({
      accessToken,
      refreshToken,
      user: {
        id: x.sub,
        name: x.name as string,
        username: x.username as string,
        lastName: x.lastName as string,
        email: x.email as string,
        roles: x.roles as string[],
        permissions: x.permissions as string[],
        idNumber: x.idNumber as string,
        isExternal: x.isExternal as boolean,
      },
    });
  },
  async logout() {
    set({ accessToken: undefined, refreshToken: undefined, user: undefined });

    await auth.logout();
  },
  login() {
    auth.login();
  },
}));
