import React from 'react';

export interface CardProps {
  titleCard: string;
  titleCardTypography: TypographyVariant;
  subtitlesCard: string[];
  subtitlesCardTypography: TypographyVariant;
  headerIcons?: IconButtonProps[];
  leftIcon: IconButtonProps;
  variant: CardVariant;
  baseColor: BaseColor;
  width?: string;
  height: string;
  additionalComponent?: React.ReactNode;
  circlePosition?: CirclePositionVariant;
  loading: boolean;
}

export interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  access?: string[];
}

export interface CardVariantStyles {
  [key: string]: {
    fontColor: string;

    backgroundColor: string | undefined;
    buttonIconColor: string | undefined;
  };
}

type CirclePositionVariant = 'top' | 'bottom';
type CardVariant = 'light' | 'single' | 'multiple';
type BaseColor = 'yellow' | 'blue' | 'aqua';
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'button';
