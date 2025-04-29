import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports

import Logo from '../../../ui-component/Logo';

import { config, useLayoutState } from '@layout/layout-state';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useLayoutState(state => state.defaultId);
  const menuOpen = useLayoutState(state => state.menuOpen);

  return (
    <ButtonBase
      disableRipple
      onClick={() => menuOpen(defaultId)}
      component={Link}
      to={config.defaultPath}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
