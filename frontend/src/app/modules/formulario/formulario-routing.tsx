import { Route, Routes } from 'react-router-dom';
import ConsultarFormularios from './features/consultar-formularios';
import VisualizarFormulario from './features/visualizar-formulario';
import ConfigurarFormulario from './features/configurar-formulario';
const FormularioRouting = () => {
  return (
    <Routes>
      <Route path="" element={<ConsultarFormularios />} />
      <Route path=":id/ver" element={<VisualizarFormulario />} />
      <Route path=":id/configurar" element={<ConfigurarFormulario />} />  
    </Routes>
  );
};

export default FormularioRouting;
