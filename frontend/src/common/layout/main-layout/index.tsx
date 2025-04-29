import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';

// project imports
//TODO: revisar breadcrumbs
//import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from '@layout/main-layout/header';
import Sidebar from '@layout/main-layout/sidebar';
import Customization from '@layout/customization';
//TODO: revisar breadcrumbs
// import navigation from 'menu-items';

// assets
// import { IconChevronRight } from '@tabler/icons-react';
import { useLayoutState } from '@layout/layout-state';
import { drawerWidth } from '@layout/constant';
import Breadcrumbs from '../../ui-component/extended/breadcrumbs';
import { IconChevronRight } from '@tabler/icons-react';
import menuItems from '../../menu-items';
import React from 'react';

//estilos
import customThemeVars from 'assets/scss/_themes-vars.module.scss';

// styles
const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
      'margin',
      open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          },
    ),
    [theme.breakpoints.up('md')]: {
      marginLeft: open ? 0 : -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px',
    },
  }),
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = React.memo(() => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer

  //const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const leftDrawerOpened = useLayoutState(state => state.opened);
  const setMenu = useLayoutState(state => state.setMenu);

  const handleLeftDrawerToggle = () => {
    setMenu(!leftDrawerOpened);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: customThemeVars.white,
          transition: leftDrawerOpened
            ? theme.transitions.create('width')
            : 'none',
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs
          separator={IconChevronRight}
          navigation={menuItems}
          // icon
          rightAlign
        />
        <Outlet />
      </Main>
      <Customization />
    </Box>
  );
});

export default MainLayout;
