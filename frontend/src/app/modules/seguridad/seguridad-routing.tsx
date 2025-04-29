import { Route, Routes } from 'react-router-dom';
import ReinicioContrasenaPerfil from './reinicio-contrasena-perfil';

const SeguridadRouting = () => {
  return (
    <>
      <Routes>
        <Route
          path={'reinicio-contrasena'}
          element={<ReinicioContrasenaPerfil />}
        />
      </Routes>
    </>
  );
};
export default SeguridadRouting;
