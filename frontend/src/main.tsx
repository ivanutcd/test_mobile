import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'assets/scss/style.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingOverlay } from '@components/overlay/loading-overlay';
import '@common/dates/prototype-date.ts';
import * as yup from 'yup';
import { yupMessages } from '@common/validations/yup-messages.ts';
import { registerCustomValidations } from '@common/validations/register-custom-validation.ts';

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);
yup.setLocale(yupMessages);
registerCustomValidations(yup);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <LoadingOverlay />
  </>,
);
