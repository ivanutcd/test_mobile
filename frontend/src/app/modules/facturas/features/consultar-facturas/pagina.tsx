import { useConfirmDialog } from '@components/dialog/confirm-dialog.tsx';
import { useNotification } from '@components/snackbar/use-notification.ts';

import { useState } from 'react';
import { PaginableGrid } from '@components/grid/paginable-grid.tsx';
import MainCard from '@common/ui-component/cards/main-card.tsx';
import { ColumnDef } from '@components/grid/models/column-def.tsx';
import {
  ActionColumn,
  generateActionColumn,
} from '@components/grid/components/action-column.tsx';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ReadMore as ShowIcon,
} from '@mui/icons-material';
import { Button } from '@components/button/button.tsx';
import {
  BtnGroup,
  GroupToolbar,
} from '@components/toolbar-group/group-toolbar.tsx';
import { useNavigate } from 'react-router';
import { Factura } from '../../models/factura.model.ts';
import { Col } from '@components/ui-layout/col.tsx';
import { Row } from '@components/ui-layout/row.tsx';
import { eliminarFactura } from '../eliminar-facturas/api.ts';
import { usePaginadoFacturas } from '../../hooks/usePaginadoFacturas.ts';

const Pagina = () => {
  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const { success, error } = useNotification();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<any>({});
  const { data, recargar } = usePaginadoFacturas();

  const open = async () => {
    const result = await confirm({
      description:
        'Por favor, ayudame a enteder si estas seguro de que la accion que realizaras es correcta ',
    });
    if (result) {
      alert('Confirmado');
    }
  };

  const toast = () => {
    success('I love snacks.');
    success(' snacks.');
    error('Error snacks.');
  };

  const buscarNombre = () => {
    setSearch({ nombre: search.nombre === undefined ? 'jose' : undefined });
  };

  const actions: Array<ActionColumn> = [
    {
      icon: <DeleteIcon />,
      onClick: async (rowData: Factura) => {
        const result = await confirm({
          description: `Vas a  eliminar la factura numero '${rowData.numero}'`,
        });
        if (result) {
          await eliminarFactura(rowData.id);
          await recargar();
          success('Factura eliminada');
        }
      },
    },
    {
      icon: <EditIcon />,
      onClick: (rowData: Factura) => {
        navigate(`/facturas/${rowData.id}/editar`);
      },
    },
    {
      label: 'Ver',
      icon: <ShowIcon />,
      onClick: (rowData: Factura) => {
        alert(rowData.numero);
      },
    },
  ];
  const colums: ColumnDef[] = [
    {
      headerName: 'Acciones',
      field: 'actions',
      renderCell: generateActionColumn(actions),
    },
    {
      colId: 'numero',
      headerName: 'Número',
      field: 'numero',
    },
  ];

  const nuevo = () => {
    navigate('/facturas/crear');
  };
  return (
    <>
      <MainCard>
        <Row>
          <Col sx={{ mb: 2 }}>
            <GroupToolbar>
              <BtnGroup>
                <Button onClick={() => open()}>Dialogo de confirmación</Button>
                <Button onClick={() => toast()}>Toast</Button>
                <Button onClick={() => buscarNombre()}>buscar</Button>
                <Button onClick={() => nuevo()}>Nuevo</Button>
              </BtnGroup>
            </GroupToolbar>
          </Col>
        </Row>
        <PaginableGrid
          getRowId={d => d.id}
          paginable={data}
          columnDefs={colums}
        />
      </MainCard>
    </>
  );
};
export default Pagina;
