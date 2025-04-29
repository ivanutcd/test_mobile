import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { CardProps } from '@components/card/types';
import { getStrategies } from './types/strategies.tsx';
import graphicLine from '../../assets/scss/_linea_grafica_vars.module.scss';
import { Box } from '@mui/system';
import Ellipse1 from './svg/Ellipse.tsx';
import GroupEllipse from './svg/GroupEllipse.tsx';
import { Button } from '@components/button/button.tsx';
import { useTheme } from '@mui/material/styles';
import { CustomTheme } from '@themes/default/types/customTheme.ts';
import { useSessionState } from '@common/security/store.ts';

const CardComponent = ({
  titleCard,
  titleCardTypography,
  headerIcons,
  subtitlesCard,
  subtitlesCardTypography,
  leftIcon,
  variant,
  baseColor,
  width,
  height,
  additionalComponent,
  circlePosition,
}: CardProps) => {
  const theme = useTheme<CustomTheme>();
  const selected = getStrategies(baseColor)[variant];
  const user = useSessionState(x => x.user);
  const actions = user?.permissions ?? [];

  function isArray(value: any): value is any[] {
    return value instanceof Array;
  }

  const headerIconsNews = headerIcons?.filter(
    f =>
      f.access == null ||
      f.access?.length === 0 ||
      f.access?.some(c => isArray(actions) && actions.some(a => a === c)),
  );

  return (
    <Box sx={{ width: width, height: height }}>
      <Card
        sx={{
          margin: 'auto',
          width: graphicLine.w_full,
          height: graphicLine.w_full,
          backgroundColor: selected.backgroundColor,
          borderRadius: theme.custom.borderRadius.r1,
          position: 'relative',
        }}
      >
        {/* HEADER ICON(S) */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <>
            {headerIconsNews?.map((iconData: any, index: number) => (
              <IconButton
                key={index}
                onClick={iconData.onClick}
                sx={{
                  zIndex: 1,
                  padding: 0,
                }}
              >
                <Tooltip key={index} title={iconData.tooltip}>
                  {iconData.children}
                </Tooltip>
              </IconButton>
            ))}
          </>
        </Box>

        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: additionalComponent ? 'flex-start' : 'center',
            height: graphicLine.w_full,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems={'center'}
            wrap="nowrap"
            zIndex={1}
          >
            {/* LEFT BUTTON */}
            <Grid item>
              <Button
                disabled={leftIcon.onClick === undefined ? true : false}
                onClick={leftIcon.onClick}
                sx={{
                  backgroundColor: selected.buttonIconColor,
                  //el icono es cuadrado no podemos utilizar widthLogo y
                  //el tamaño necesario aun no esta mapeado por eso el uso de heightLogo para minWidth
                  width: graphicLine.heightLogo,
                  minWidth: graphicLine.heightLogo,
                  height: graphicLine.heightLogo,
                  minHeight: graphicLine.heightLogo,
                  borderRadius: graphicLine.borderRadiusButton,
                }}
              >
                <Box
                  sx={{
                    height: '24px',
                    width: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {leftIcon.children}
                </Box>
              </Button>
            </Grid>
            {/* TITLE */}
            <Grid
              item
              container
              direction={'column'}
              zeroMinWidth
              sx={{ flexWrap: 'nowrap' }}
            >
              <Typography
                noWrap
                color={selected.fontColor}
                variant={titleCardTypography}
              >
                {titleCard}
              </Typography>
              {/* SUBTITLE(S) */}
              <Box
                sx={{
                  marginLeft: subtitlesCard.length > 1 ? '10px' : '0px',
                }}
              >
                {subtitlesCard.map((subtitle, index) => (
                  <Typography
                    sx={{ marginTop: 1 }}
                    noWrap
                    key={index}
                    color={selected.fontColor}
                    variant={subtitlesCardTypography}
                  >
                    {subtitle}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        {variant === 'single' && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: circlePosition === 'top' ? 0 : 'unset',
              bottom: circlePosition === 'bottom' ? -5 : 'unset',
            }}
          >
            <Ellipse1 fillColor={baseColor} position={circlePosition} />
          </Box>
        )}

        {variant === 'light' && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <GroupEllipse fillColor={baseColor} />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default CardComponent;
