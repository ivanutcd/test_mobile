import { forwardRef, ReactNode } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material';
import {
  Card,
  CardContent,
  CardHeader,
  CardOwnProps,
  Divider,
  SxProps,
  Typography,
} from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

interface MainCardProps extends CardOwnProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps<Theme>;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: string | ReactNode;
  [key: string]: any;
  divider?: boolean;
}
const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      divider = true,
      ...others
    },
    ref,
  ) => {
    const theme: any = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow
              ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
              : 'inherit',
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              darkTitle ? (
                <Typography
                  variant="h3"
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                >
                  {title}
                </Typography>
              ) : (
                title
              )
            }
            action={secondary as ReactNode}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  },
);

// MainCard.propTypes = {
//   border: PropTypes.bool,
//   boxShadow: PropTypes.bool,
//   children: PropTypes.node,
//   content: PropTypes.bool,
//   contentClass: PropTypes.string,
//   contentSX: PropTypes.object,
//   darkTitle: PropTypes.bool,
//   secondary: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
//   shadow: PropTypes.string,
//   sx: PropTypes.object,
//   title: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.string,
//     PropTypes.object,
//   ]),
// };

export default MainCard;
