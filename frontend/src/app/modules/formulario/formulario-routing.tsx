import { Route, Routes } from 'react-router-dom';
import ConsultarFormularios from './features/consultar-formularios';

const FormularioRouting = () => {
    return (
        <Routes>
        <Route path="" element={<ConsultarFormularios />} />
        </Routes>
    );
}

export default FormularioRouting;