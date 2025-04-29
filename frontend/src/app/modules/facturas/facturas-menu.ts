import { Menu } from '../../../common/menu-items/models/menu.ts';
import { IconDashboard } from '@tabler/icons-react';

export const FacturasMenu: Menu = {
  id: 'facturas',
  title: 'Facturas',
  type: 'group',
  access: [],
  breadcrumbs: true,
  children: [

    {
      id: 'listado-facturas',
      title: 'Listado',
      type: 'item',
      url: '/facturas',
      icon: IconDashboard,
      breadcrumbs: true,
      access: [],
      children:[
        {
          id: 'crear-factura',
          title: 'Crear factura',
          type: 'item',
          url: '/facturas/crear',
          icon: IconDashboard,
          breadcrumbs: true,
          access: [],
        },
        {
          id: 'editar-factura',
          title: 'Editar factura',
          type: 'item',
          url: '/facturas/:id/editar',
          icon: IconDashboard,
          breadcrumbs: true,
          access: [],
        },
      ]
    },
  ],
};
