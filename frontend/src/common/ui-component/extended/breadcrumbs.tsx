import PropTypes from 'prop-types';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project imports

// assets
import { IconTallymark1 } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
//import { config } from '@layout/layout-state';
import { gridSpacing } from '@layout/constant';
import { Menu } from '../../menu-items/models/menu.ts';

const findGroupWithMatchingChild = (
  menu: Menu,
  location: string,
): Menu | undefined => {
  if (menu.type === 'group' && menu.children) {
    for (const child of menu.children) {
      if (location.includes(child?.url || '')) {
        return menu;
      }
      const foundInChildren = findGroupWithMatchingChild(child, location);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return undefined;
};

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center',
};

// ==============================|| BREADCRUMBS ||============================== //
// interface BreadcrumbsProps extends CardProps {
//
//   card?: boolean,
//   divider?: boolean,
//   icon?: boolean,
//   icons?: boolean,
//   maxItems?: number,
//   navigation?: MenuItems,
//   rightAlign?: boolean,
//   separator?: (...args: any[]) => any | object,
//   titleBottom?: boolean
//   title?: string | undefined | boolean;
//
// }

interface BreadcrumbData {
  pathname: string;
  name?: string;
  active: boolean;
  menu: Menu;
}

const Breadcrumbs = ({
  card,
  divider,
  // icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  ...others
}: any) => {
  const theme: any = useTheme();
  const loca = useLocation();

  const currentLocation = loca.pathname;

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  function flattenMenusWithBreadcrumbs(menus: Menu[]): Menu[] {
    const flattenedMenus: Menu[] = [];

    function flatten(menu: Menu) {
      const { children, breadcrumbs } = menu;

      if (breadcrumbs) {
        flattenedMenus.push({ ...menu, children: undefined });
      }

      if (children) {
        children.forEach(child => flatten(child));
      }
    }

    menus.forEach(menu => flatten(menu));

    return flattenedMenus;
  }

  const getRouteMenu = (pathname: string, routes: Array<Menu>) => {
    for (let i = 0; i < routes.length; i++) {
      const routePath = routes[i];
      if (routePath.url === undefined) continue;
      if (matchPath(routePath.url as string, pathname)) {
        return { ...routePath, url: pathname };
      }
    }
    return undefined;
  };

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: Array<BreadcrumbData> = [];
    const items = flattenMenusWithBreadcrumbs(navigation?.items);
    //const main = items.filter(x => x.type === 'group')[0];
    const items2: Menu[] = navigation?.items || [];
    // const main = items2.find(
    //   x =>
    //     x.type === 'group' && x.children?.some(child => child.url === location),
    // );
    // Encuentra el primer grupo que tenga un hijo coincidente con la ubicación
    const main = items2.find(x => {
      if (x.type === 'group') {
        return !!findGroupWithMatchingChild(x, location);
      }
      return false;
    });
    // console.log('main', main);
    if (main) {
      breadcrumbs.push({
        pathname: '/',
        name: main.title,
        active: false,
        menu: main,
      });
    }
    location.split('/').reduce((prev, curr, index, array) => {
      // console.log(prev, 'previo');
      // console.log(curr, 'curr');
      // console.log(index, 'index');
      // console.log(array, 'array');

      const currentPathname = `${prev}/${curr}`;
      const routeMenu = getRouteMenu(currentPathname, items);
      routeMenu &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeMenu.title,
          active: index + 1 === array.length,
          menu: routeMenu,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  // useEffect(() => {
  //   navigation?.items?.map((menu: Menu) => {
  //     if (menu.type && menu.type === 'group') {
  //       getCollapse(menu);
  //     }
  //     return false;
  //   });
  // });

  // item separator
  const SeparatorIcon = separator as any;
  const separatorIcon = separator ? (
    <SeparatorIcon stroke={1.5} size="1rem" />
  ) : (
    <IconTallymark1 stroke={1.5} size="1rem" />
  );

  //let mainContent;
  //let itemContent;
  let breadcrumbContent = <Typography />;

  //let CollapseIcon;
  let ItemIcon;

  const currentItem = breadcrumbs.filter(x => x.active)[0];
  // items
  if (currentItem) {
    const currentMenu = currentItem.menu;

    ItemIcon = currentMenu.icon ? currentMenu.icon : AccountTreeTwoToneIcon;

    // main
    if (breadcrumbs && breadcrumbs.length > 0) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(gridSpacing),

            borderColor: theme.palette.primary[200] + 75,
            background:
              card === false ? 'transparent' : theme.palette.background.default,
          }}
          {...others}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {currentItem.menu.title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{
                    '& .MuiBreadcrumbs-separator': {
                      width: 16,
                      ml: 1.25,
                      mr: 1.25,
                    },
                  }}
                  aria-label="breadcrumb"
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle1"
                    sx={linkSX}
                  >
                    Inicio
                  </Typography>

                  {breadcrumbs.map((item: BreadcrumbData) => {
                    const currentMenu = item.menu;
                    ItemIcon = currentMenu.icon
                      ? currentMenu.icon
                      : AccountTreeTwoToneIcon;

                    if (currentMenu.url !== undefined) {
                      return (
                        <Typography
                          key={'bread-' + currentMenu.id}
                          component={item.active ? 'span' : Link}
                          to={item.active ? undefined : currentMenu.url}
                          variant="subtitle1"
                          sx={
                            item.active
                              ? {
                                  display: 'flex',
                                  textDecoration: 'none',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  // color: 'grey.500',
                                  color: 'var(--azul-botones, #5FD0DF)',
                                }
                              : linkSX
                          }
                        >
                          {icons && <ItemIcon style={iconStyle} />}
                          {currentMenu.title}
                        </Typography>
                      );
                    }

                    if (item.menu.url === undefined) {
                      return (
                        <Typography
                          key={'bread-' + currentMenu.id}
                          variant="subtitle1"
                          sx={linkSX}
                        >
                          {icons && <ItemIcon style={iconStyle} />}
                          {currentMenu.title}
                        </Typography>
                      );
                    }

                    return <>nada</>;
                  })}
                </MuiBreadcrumbs>
              </Grid>
              {title && titleBottom && (
                <Grid item>
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    {currentItem.menu.title}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && (
            <Divider
              sx={{ borderColor: theme.palette.primary.main, mb: gridSpacing }}
            />
          )}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  divider: PropTypes.bool,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  maxItems: PropTypes.number,
  navigation: PropTypes.object,
  rightAlign: PropTypes.bool,
  separator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
};

export default Breadcrumbs;
