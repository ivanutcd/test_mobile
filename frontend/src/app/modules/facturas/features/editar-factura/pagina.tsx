import MainCard from '@common/ui-component/cards/main-card.tsx';
import { FacturaFormulario } from '../../components/factura-formulario.tsx';
import { Row } from '@components/ui-layout/row.tsx';
import { Col } from '@components/ui-layout/col.tsx';

import { useNotification } from '@components/snackbar/use-notification.ts';

import { Button } from '@components/button/button.tsx';
import { Factura } from '../../models/factura.model.ts';
import {
  BtnGroup,
  GroupToolbar,
} from '@components/toolbar-group/group-toolbar.tsx';
import { UseObtenerFactura } from '../../hooks/useObtenerFactura.ts';
import { FacturaFiltros } from '../../models/factura-filtros.model.ts';
import { useParams, } from 'react-router-dom';
import { Loading } from '@common/ui-component/Loading.tsx';
import { editarFactura } from './api.ts';
import { useNavigate } from 'react-router';


const nameForm = 'cualquierCosa';
const Pagina = () => {
  const navigate = useNavigate();
  const {id}=useParams<FacturaFiltros>();
  const { data, loading } = UseObtenerFactura(id);
  const { success } = useNotification();

  const guardar = async (values: Factura) => {
    await editarFactura({...values,id:id as string});
    success('Guardado correctamente');
    navigate(`/facturas`);
  };

  if(loading){
    return  <Loading/>
  }

  return (
    <MainCard >
      <FacturaFormulario
        initialValues={data}
        onSubmit={values => guardar(values as Factura)}
        nombreFormulario={nameForm}
      />

      <Row >
        <Col sx={{ mt: 2 }}>
          <GroupToolbar>
            <BtnGroup />
            <BtnGroup>
              <Button form={nameForm} type="submit" >
                Guardar
              </Button>
            </BtnGroup>
          </GroupToolbar>
        </Col>
      </Row>
    </MainCard>
  );
};
export default Pagina;
