import { WithAccess } from './with-access.ts';
import { ChipProps } from '@mui/material';

export interface Menu extends WithAccess {
  id: string;
  title?: string;
  type: 'group' | 'item' | 'collapse';
  children?: Array<Menu>;
  caption?: string;

  ///Children
  chip?: ChipProps;
  disabled?: boolean;
  url?: string;
  breadcrumbs?: boolean;
  external?: boolean;
  target?: string | boolean;
  icon?: (props: any) => JSX.Element;
}
