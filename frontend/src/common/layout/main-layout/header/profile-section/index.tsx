import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../ui-component/cards/main-card.tsx';
import Transitions from '../../../../ui-component/extended/transitions';

import User1 from '@mui/icons-material/AccountCircle';
// assets

import { IconLogout, IconPasswordUser } from '@tabler/icons-react';
import { useLayoutState } from '@layout/layout-state';
import { useSessionState } from '@common/security/store.ts';
import { SettingIcon } from '@common/icon-svg/setting.icon.tsx';

import customThemeVars from 'assets/scss/_themes-vars.module.scss';
import { env } from 'environment/env.ts';
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme: any = useTheme();
  //const customization = useSelector((state) => state.customization);
  const customization = useLayoutState(state => state);
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const logout = useSessionState(x => x.logout);
  const user = useSessionState(x => x.user);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);
  const handleLogout = async () => {
    logout();
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: any, index: any, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          width: customThemeVars.widthProfile,
          height: customThemeVars.heightProfile,
          top: customThemeVars.top,
          marginLeft: '20px',
          alignItems: 'center',
          borderRadius: customThemeVars.borderRadiusProfile,
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: customThemeVars.white,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.light,
            background: `${theme.palette.primary.light}!important`,
            //color: theme.palette.primary.light,
            // '& svg': {
            //   stroke: theme.palette.primary.light,
            // },
          },
          '& .MuiChip-label': {
            lineHeight: 1,
          },
        }}
        icon={
          <User1
            sx={{
              ...theme.typography.mediumAvatar,
              cursor: 'pointer',
              alignItems: 'center',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<SettingIcon />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ pt: 2, pr: 2, pl: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hola, </Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {user?.name}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{user?.email}</Typography>
                    </Stack>

                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                    }}
                  >
                    <Box>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        {/*<ListItemButton*/}
                        {/*  sx={{*/}
                        {/*    borderRadius: `${customization.borderRadius}px`,*/}
                        {/*  }}*/}
                        {/*  selected={selectedIndex === 0}*/}
                        {/*  onClick={event => handleListItemClick(event, 0, '#')}*/}
                        {/*>*/}
                        {/*  <ListItemIcon>*/}
                        {/*    <SettingIcon />*/}
                        {/*  </ListItemIcon>*/}
                        {/*  <ListItemText*/}
                        {/*    primary={*/}
                        {/*      <Typography variant="body2">*/}
                        {/*        Account Settings*/}
                        {/*      </Typography>*/}
                        {/*    }*/}
                        {/*  />*/}
                        {/*</ListItemButton>*/}

                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 1}
                          onClick={event =>
                            handleListItemClick(
                              event,
                              1,
                              'seguridad/reinicio-contrasena',
                            )
                          }
                        >
                          <ListItemIcon>
                            <IconPasswordUser />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Cambiar contraseña
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        {/*<ListItemButton*/}
                        {/*  sx={{*/}
                        {/*    borderRadius: `${customization.borderRadius}px`,*/}
                        {/*  }}*/}
                        {/*  selected={selectedIndex === 1}*/}
                        {/*  onClick={event => handleListItemClick(event, 1, '#')}*/}
                        {/*>*/}
                        {/*  <ListItemIcon>*/}
                        {/*    <IconUser stroke={1.5} size="1.3rem" />*/}
                        {/*  </ListItemIcon>*/}
                        {/*  <ListItemText*/}
                        {/*    primary={*/}
                        {/*      <Grid*/}
                        {/*        container*/}
                        {/*        spacing={1}*/}
                        {/*        justifyContent="space-between"*/}
                        {/*      >*/}
                        {/*        <Grid item>*/}
                        {/*          <Typography variant="body2">*/}
                        {/*            Social Profile*/}
                        {/*          </Typography>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid item>*/}
                        {/*          <Chip*/}
                        {/*            label="02"*/}
                        {/*            size="small"*/}
                        {/*            sx={{*/}
                        {/*              bgcolor: theme.palette.warning.dark,*/}
                        {/*              color: theme.palette.background.default,*/}
                        {/*            }}*/}
                        {/*          />*/}
                        {/*        </Grid>*/}
                        {/*      </Grid>*/}
                        {/*    }*/}
                        {/*  />*/}
                        {/*</ListItemButton>*/}
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Cerrar sesión
                              </Typography>
                            }
                          />

                        </ListItemButton>
                      </List>
                      <Stack margin={0}  direction="row" justifyContent="end" sx={{ p:0, mr: 2,mb:2 }}>
                        <Typography variant="subtitle2">
                          {env.VERSION}
                        </Typography>
                      </Stack>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
