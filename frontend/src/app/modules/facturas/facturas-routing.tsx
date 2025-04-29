import { Route, Routes } from 'react-router-dom';
import ConsultarFacturas from './features/consultar-facturas';
import CrearFactura from './features/crear-factura';
import EditarFactura from './features/editar-factura';

const FacturasRouting = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<ConsultarFacturas />} />
        <Route path={'crear'} element={<CrearFactura />} />
        <Route path={':id/editar'} element={<EditarFactura />} />
      </Routes>
    </>
  );
};
export default FacturasRouting;
