// material-ui
import { Typography } from '@mui/material';

// project imports

import { Menu } from 'common/menu-items/models/menu';
import NavGroup from '@layout/main-layout/sidebar/menu-list/nav-group';
import { UseAllowedMenu } from '../../../../security/use-allowed-menu.ts';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const items = UseAllowedMenu();
  const navItems = items.map((item: Menu) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
