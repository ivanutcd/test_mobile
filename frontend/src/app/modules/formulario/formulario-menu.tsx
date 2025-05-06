import { IconDashboard } from '@tabler/icons-react';
import { Menu } from '../../../common/menu-items/models/menu.ts';

export const FormularioMenu: Menu = {
    id: 'parametrizacion',
  title: 'Parametrizacion',
  type: 'group',
  access: [],
  breadcrumbs: true,
  children: [
    {
          id: 'formularios',
          title: 'Formularios',
          type: 'item',
          url: '/formularios',
          icon: IconDashboard,
          breadcrumbs: true,
          access: [],
    }
  ]
}