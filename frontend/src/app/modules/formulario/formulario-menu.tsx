import { IconDashboard, IconList } from '@tabler/icons-react';
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
      children: [
        {
          id: 'visualizar-formulario',
          title: 'Visualizar Formulario',
          type: 'item',
          url: `/formularios/:id/ver`,
          icon: IconList,
          breadcrumbs: true,
          access: [],
        },
        {
          id: 'configurar-formulario',
          title: 'Configurar Formulario',
          type: 'item',
          url: '/formularios/:id/configurar',
          icon: IconList,
          breadcrumbs: true,
          access: [],
        },
      ],
    }
   
  ],
};
