import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
} from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
// import FilterListSharpIcon from '@mui/icons-material/FilterListSharp';
// assets
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';
import Transitions from '../../../../ui-component/extended/transitions';
import { ListFilterIcon } from '@common/icon-svg/list-filter.icon.tsx';

//estilos
import customThemeVars from 'assets/scss/_themes-vars.module.scss';
import lineaGrafica from 'assets/scss/_linea_grafica_vars.module.scss';

import { CustomTheme } from '@themes/default/types/customTheme.ts';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px',
  },
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: lineaGrafica.widthSearch,
    height: lineaGrafica.heightSearch,
    marginTop: lineaGrafica.marginTopSearch,
    marginLeft: lineaGrafica.marginLeftSearch,
    background: customThemeVars.greyBackground,
    padding: '4px 6px 4px 6px',
    '& input': {
      background: customThemeVars.greyBackground,
      padding: '0 !important',
      margin: '-1.5px !important',
      color: customThemeVars.grey550,
    },
    [theme.breakpoints.down('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,
      background: '#fff',
    },
    '& ::placeholder': {
      color: `${customThemeVars.grey550} !important`,
    },
  }),
);

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }: { theme: any }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light,
    },
  }),
);

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }: any) => {
  const theme = useTheme<CustomTheme>();

  const gray500 = (theme.palette.grey as any)[500];
  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Buscar"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="1rem" color={gray500} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <ButtonBase sx={{ borderRadius: '12px' }}>
            <HeaderAvatarStyle variant="rounded">
              <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
            </HeaderAvatarStyle>
          </ButtonBase>
          <Box sx={{ ml: 2 }}>
            <ButtonBase sx={{ borderRadius: '12px' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  background: theme.palette.orange.light,
                  color: theme.palette.orange.dark,
                  '&:hover': {
                    background: theme.palette.orange.dark,
                    color: theme.palette.orange.light,
                  },
                }}
                {...bindToggle(popupState)}
              >
                <IconX stroke={1.5} size="1.3rem" />
              </Avatar>
            </ButtonBase>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight' }}
    />
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState,
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {popupState => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                  <HeaderAvatarStyle
                    variant="rounded"
                    {...bindToggle(popupState)}
                  >
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions
                      type="zoom"
                      {...TransitionProps}
                      sx={{ transformOrigin: 'center left' }}
                    >
                      <Card
                        sx={{
                          background: '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none',
                          },
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item xs>
                              <MobileSearch
                                value={value}
                                setValue={setValue}
                                popupState={popupState}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          borderRadius: '0 !important',
        }}
      >
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Buscar"
          startAdornment={
            <InputAdornment position="start" sx={{ marginBottom: '2px' }}>
              <IconSearch
                // stroke={1.5}
                size="15px"
                color={customThemeVars.grey550}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="start">
              <ListFilterIcon />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
        />
      </Box>
    </>
  );
};

export default SearchSection;
