import { Route, Routes } from 'react-router-dom';
import ConsultarFormularios from './features/consultar-formularios';
import VisualizarFormulario from './features/visualizar-formulario';

const FormularioRouting = () => {
  return (
    <Routes>
      <Route path="" element={<ConsultarFormularios />} />
      <Route path=":id/ver" element={<VisualizarFormulario />} />
    </Routes>
  );
};

export default FormularioRouting;
