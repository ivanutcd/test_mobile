import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const HomeModule = Loadable(lazy(() => import('./home-routing')));

export default HomeModule;
