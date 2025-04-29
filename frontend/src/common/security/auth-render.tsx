import { useSessionState } from '@common/security/store.ts';

interface Props {
  access?: string[];
  children: any;
}
export const AuthRender = ({ children, access }: Props) => {
  const { hasAccess } = useAccess();

  if (!hasAccess(access)) {
    return <></>;
  }

  return children;
};

export const useAccess = () => {
  const user = useSessionState(x => x.user);

  return {
    hasAccess: (access?: string[]) => {
      return access
        ? access.some(
            x =>
              x.length === 0 ||
              (user?.permissions as any).some((y: any) => y === x),
          )
        : true;
    },
    hasNotAccess: (access?: string[]) => {
      return access
        ? !access.some(
            x =>
              x.length === 0 ||
              (user?.permissions as any).some((y: any) => y === x),
          )
        : false;
    },
  };
};

// export const HasAccess = (access?: string[]): boolean => {

//   // return hasAccess;
// };
