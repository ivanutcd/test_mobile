import { useEffect, useState } from 'react';
import {
  ChartsLegend,
  ChartsTooltip,
  DefaultizedPieValueType,
  pieArcLabelClasses,
  PiePlot,
  ResponsiveChartContainer,
} from '@mui/x-charts';
import { PieProps, Styles, PieSize } from './types';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomTheme } from '@common/themes/default/types/customTheme';
import { PieCenterLabel } from './center-label';
import { defaultPalette } from './default-palette';
import { formatCurrency } from './helpers/currency-formatter';
import themeVars from '../../../assets/scss/_themes-vars.module.scss';
import { darkenColor } from './helpers/darken-color';

const defaultStyles: Styles = {
  innerRadius: 100,
  paddingAngle: 4,
  cornerRadius: 7,
  highlightScope: { faded: 'global', highlighted: 'item' },
  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
};
const defaultSize: PieSize = { height: 520 };

const Pie = ({
  data,
  styles = defaultStyles,
  size = defaultSize,
  title,
  titleColor,
  palette = defaultPalette,
  hideToolTip = false,
  currencyFormatter,
}: PieProps) => {
  const hideLegend: boolean = data.length > 6;
  const theme = useTheme<CustomTheme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoverData, setHoverData] = useState<DefaultizedPieValueType | null>(
    null,
  );
  const [invisibleAreaLabelColor, setInvisibleAreaLabelColor] =
    useState<string>(themeVars.grey550);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    setHoverData(null);
  }, [data]);
  return (
    <Paper
      sx={{
        width: '100%',
        height: size,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.custom.borderRadius.r1,
      }}
      elevation={0}
    >
      {title && (
        <Typography
          variant="h3"
          noWrap
          sx={{
            padding: '40px 0 5px 40px',
            color: titleColor ? titleColor : undefined,
          }}
        >
          {title}
        </Typography>
      )}

      <ResponsiveChartContainer
        series={[
          {
            type: 'pie',
            data,
            ...styles,
            arcLabel: item => {
              const percentage = (item.value / totalValue) * 100;
              if (percentage < 1) {
                setInvisibleAreaLabelColor(item.color);
                return formatCurrency(item.value, currencyFormatter);
              }
              return '';
            },

            arcLabelRadius: '110%',
          },
        ]}
        sx={{
          paddingLeft: isSmallScreen ? 0 : 6,
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
            fill: invisibleAreaLabelColor,
          },
        }}
        colors={palette}
      >
        <PiePlot />

        {hideToolTip ? (
          <>
            <ChartsTooltip
              trigger="item"
              slots={{
                itemContent: ({ series, itemData }) => {
                  if (!series || !itemData) return null;

                  const dataIndex = itemData.dataIndex;
                  if (dataIndex !== undefined && series.data[dataIndex]) {
                    const hovered = series.data[
                      dataIndex
                    ] as DefaultizedPieValueType;
                    if (!hoverData || hoverData.id !== hovered.id) {
                      setHoverData(hovered);
                    }

                    return null;
                  }
                  return null;
                },
              }}
            />
            <PieCenterLabel
              color={
                hoverData?.color
                  ? darkenColor(hoverData.color, 10)
                  : themeVars.grey550
              }
              lines={
                hoverData
                  ? [
                      formatCurrency(hoverData.value, currencyFormatter),

                      `${hoverData.label}`,
                    ]
                  : ['']
              }
            />
          </>
        ) : (
          <ChartsTooltip trigger="item" />
        )}

        <ChartsLegend
          hidden={hideLegend}
          slotProps={{
            legend: {
              direction: isSmallScreen ? 'row' : 'column',
              position: { vertical: 'top', horizontal: 'left' },
              padding: 0,
            },
          }}
        />
      </ResponsiveChartContainer>
    </Paper>
  );
};

export default Pie;
