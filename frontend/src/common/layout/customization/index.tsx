import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from '../../ui-component/cards/sub-card.tsx';

import { LayoutState, useLayoutState } from '@layout/layout-state.ts';
import { gridSpacing } from '@layout/constant.ts';

// concat 'px'
function valueText(value: any) {
  return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme();

  const [customization, setearFontFamily, setearBorderRadius] = useLayoutState(
    state => [
      {
        ...state,
      } as LayoutState,
      state.setFontFamily,
      state.setBorderRadius,
    ],
  );

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  // state - border radius

  const handleBorderRadius = (newValue: number) => {
    setearBorderRadius(newValue);
  };

  let initialFont;
  switch (customization.fontFamily) {
    case `'Inter', sans-serif`:
      initialFont = 'Inter';
      break;
    case `'Poppins', sans-serif`:
      initialFont = 'Poppins';
      break;
    case `'TT Norms Pro', sans-serif`:
    default:
      initialFont = 'TT Norms Pro';
      break;
  }

  // state - font family
  const [fontFamily, setFontFamily] = useState(initialFont);
  useEffect(() => {
    let newFont;
    switch (fontFamily) {
      case 'Inter':
        newFont = `'Inter', sans-serif`;
        break;
      case 'Poppins':
        newFont = `'Poppins', sans-serif`;
        break;
      case 'TT Norms Pro':
      default:
        newFont = `'TT Norms Pro', sans-serif`;
        break;
    }

    setearFontFamily(newFont);
  }, [setearFontFamily, fontFamily]);

  return (
    <>
      {/* toggle button */}
      {/*<Tooltip title="Live Customize">*/}
      {/*  <Fab*/}
      {/*    component="div"*/}
      {/*    onClick={handleToggle}*/}
      {/*    size="medium"*/}
      {/*    variant="circular"*/}
      {/*    color="secondary"*/}
      {/*    sx={{*/}
      {/*      borderRadius: 0,*/}
      {/*      borderTopLeftRadius: '50%',*/}
      {/*      borderBottomLeftRadius: '50%',*/}
      {/*      borderTopRightRadius: '50%',*/}
      {/*      borderBottomRightRadius: '4px',*/}
      {/*      top: '25%',*/}
      {/*      position: 'fixed',*/}
      {/*      right: 10,*/}
      {/*      zIndex: theme.zIndex.speedDial,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <AnimateButton type="rotate">*/}
      {/*      <IconButton color="inherit" size="large" disableRipple>*/}
      {/*        <IconSettings />*/}
      {/*      </IconButton>*/}
      {/*    </AnimateButton>*/}
      {/*  </Fab>*/}
      {/*</Tooltip>*/}

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '50px',
          },
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              {/* font family */}
              <SubCard title="Font Family">
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={e => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="TT Norms Pro"
                      control={<Radio />}
                      label="TT Norms Pro"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Poppins"
                      control={<Radio />}
                      label="Poppins"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Inter"
                      control={<Radio />}
                      label="Inter"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              {/* border radius */}
              <SubCard title="Border Radius">
                <Grid
                  item
                  xs={12}
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 2.5 }}
                >
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      size="small"
                      value={customization.borderRadius}
                      onChange={(_, value) =>
                        handleBorderRadius(value as number)
                      }
                      getAriaValueText={valueText}
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider-small-steps"
                      marks
                      step={2}
                      min={4}
                      max={24}
                      color="secondary"
                      sx={{
                        '& .MuiSlider-valueLabel': {
                          color: 'secondary.light',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      24px
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;
