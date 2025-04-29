/// <reference types="vite/client" />
interface ImportMeta extends ImportMeta {
  env: {
    VITE_API_URL: string;
    VITE_APP_VERSION: number;
    VITE_AUTH0_DOMAIN: string;
    VITE_AUTH0_CLIENT_ID: string;
    VITE_AUTH0_AUDIENCE: string;
  };
}
