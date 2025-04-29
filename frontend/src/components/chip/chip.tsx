import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Chip, ChipProps, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomChipProps extends ChipProps {
  label: string;
  onClick?: () => void;
  variant?: 'filled' | 'outlined';
  clickable?: boolean;
  icon?: React.ReactElement<SvgIconProps>;
  iconSize?: 'small' | 'medium' | 'large';
  color?: ChipProps['color'];
}

const StyledChip = styled(Chip, {
  shouldForwardProp: prop => prop !== 'color',
})<{ color?: ChipProps['color'] }>(({ theme, color, variant }) => {
  const getDarkColor = (color: ChipProps['color']) => {
    switch (color) {
      case 'error':
        return theme.palette.error.dark;
      case 'info':
        return theme.palette.info.main;
      case 'primary':
        return theme.palette.primary.dark;
      case 'secondary':
        return theme.palette.secondary.dark;
      case 'success':
        return theme.palette.success.dark;
      case 'warning':
        return theme.palette.warning.dark;
      default:
        return 'default';
    }
  };

  return {
    ...(variant === 'outlined' && {
      border: `1px solid ${getDarkColor(color)}`,
    }),
    color: getDarkColor(color),
  };
});

const StyledIcon = styled('span')<{
  size: CustomChipProps['iconSize'];
}>(({ size }) => ({
  marginTop: 4,
  paddingRight: 4,
  paddingLeft: 4,
  fontSize: size === 'small' ? 16 : size === 'large' ? 24 : 20,
}));

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  onClick,
  variant = 'outlined',
  clickable = false,
  icon,
  color = 'default',
  iconSize = 'small',
  ...rest
}) => {
  const theme = useTheme();

  return (
    <StyledChip
      label={label}
      onClick={clickable ? onClick : undefined}
      variant={variant}
      clickable={clickable}
      icon={
        icon && (
          <StyledIcon size={iconSize} color={color}>
            {icon}
          </StyledIcon>
        )
      }
      color={color}
      theme={theme}
      {...rest}
    />
  );
};

export default CustomChip;
