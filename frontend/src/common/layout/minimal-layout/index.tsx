import { Outlet } from 'react-router-dom';

// project imports
import Customization from '@layout/customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <>
    <Outlet />
    <Customization />
  </>
);

export default MinimalLayout;
