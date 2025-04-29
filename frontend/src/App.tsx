import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import NavigationScroll from '@layout/navigation-scroll';
import { Theme } from '@themes/default';
import { LayoutState, useLayoutState } from '@layout/layout-state';
import Routes from '@themes/theme-routes';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import React from 'react';
import { esES } from '@mui/x-date-pickers/locales';

// project imports

// ==============================|| APP ||============================== //

const App = React.memo(() => {
  const spanishLocale =
    esES.components.MuiLocalizationProvider.defaultProps.localeText;

  const customization: LayoutState = useLayoutState(state => {
    return {
      fontFamily: state.fontFamily,
      borderRadius: state.borderRadius,
      opened: state.opened,
      defaultId: state.defaultId,
      isOpen: state.isOpen,
    };
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme(customization)}>
        <CssBaseline />
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          preventDuplicate
        >
          <ConfirmProvider
            defaultOptions={{
              confirmationButtonProps: { autoFocus: true },
            }}
          >
            <LocalizationProvider
              dateAdapter={AdapterLuxon}
              adapterLocale="es"
              localeText={spanishLocale}
            >
              <NavigationScroll>
                <Routes />
              </NavigationScroll>
            </LocalizationProvider>
          </ConfirmProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
});

export default App;
