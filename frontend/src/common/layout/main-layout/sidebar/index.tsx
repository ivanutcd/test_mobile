import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Stack, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './menu-list';
import LogoSection from '../logo-section';
// import MenuCard from './menu-card';
import { drawerWidth } from '@layout/constant';
import { CustomTheme } from '@themes/default/types/customTheme.ts';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }: any) => {
  const theme: CustomTheme = useTheme<CustomTheme>();

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md') as any);

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '12px',
            paddingRight: '20px',
            paddingTop: '20px',
            paddingBottom: '1px',
          }}
        >
          <MenuList />
          {/*<MenuCard />*/}
          <Stack
            direction="row"
            alignItems="flex-end"
            sx={{ paddingTop: '300px' }}
          >

          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/*<MenuCard />*/}
          <Stack direction="row" justifyContent="start" sx={{ mb: 2 }}>
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background?.default,
            color: theme.palette.text?.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: theme.custom.menu.topMenu,
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
