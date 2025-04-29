import { ChipProps } from '@mui/material';
import { WithAccess } from './with-access';

export interface MenuChildren extends WithAccess {
  chip?: ChipProps;
  disabled?: boolean;
  id: string;
  title: string;
  type: 'group' | 'item' | 'collapse';
  url?: string;
  breadcrumbs?: boolean;
  children?: MenuChildren[];
  caption?: string;
  external?: boolean;
  target?: string | boolean;
  icon?: (props: any) => JSX.Element;
}
