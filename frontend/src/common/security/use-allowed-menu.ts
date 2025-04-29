import { Menu } from '../menu-items/models/menu.ts';
import { useSessionState } from './store.ts';
import menuItem from '../menu-items';

function instanceOfA(object: any): object is Menu[] {
  return object?.length > 0 && object[0].id !== undefined;
}
const menu = menuItem.items;
export const UseAllowedMenu = (): Array<Menu> => {
  const user = useSessionState(state => state.user);

  function isArray(value: any): value is any[] {
    return value instanceof Array;
  }

  const actions = user?.permissions ?? [];

  const menuAllowed = menu.filter(x => {
    return (
      x.access.length === 0 ||
      x.access.some(a => isArray(actions) && actions.some(y => y === a))
    );
  });

  function getChildren(x: Menu): Array<Menu> | undefined {
    const isType = instanceOfA(x?.children);
    if (isType) {
      const values = (x.children as Menu[]).map((y: Menu) => {
        return y.type ? y : ({ ...y, type: 'group' } as Menu);
      });
      return values.filter(
        x =>
          x.access.length === 0 ||
          x.access.some(
            a => isArray(actions) && actions.some((y: any) => y === a),
          ),
      );
    }
    return x.children;
  }

  const navigation = menuAllowed.map(x => {
    const record: Menu = {
      ...x,
      type: x.type ? x.type : 'group',
      children: getChildren(x),
    };
    return record;
  });

  return navigation as Array<Menu>;
};
