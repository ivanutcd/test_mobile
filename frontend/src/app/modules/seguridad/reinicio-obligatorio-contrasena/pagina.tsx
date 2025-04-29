import MainCard from '@common/ui-component/cards/main-card.tsx';
import { ReinicioContrasenaFormulario } from '../components/reinicio-contrasena-formulario';

import { Row } from '@components/ui-layout/row.tsx';
import { Col } from '@components/ui-layout/col.tsx';
import { ResetPasswordRequestProps } from '../common/types.ts';
import { useNotification } from '@components/snackbar/use-notification.ts';
import { reiniciarContrasena } from '../common/api.ts';
import { useSessionState } from '@common/security/store.ts';
import { Button } from '@components/button/button.tsx';

const Pagina = () => {
  const nameForm = 'resetear contraseña';
  const urlEndpoint = 'forgot-password';
  const cardTitle = 'Resetear contraseña';
  const successMsg = 'Cambio exitoso, será redirigido al inicio de sesión...';
  const { success } = useNotification();
  const logout = useSessionState(x => x.logout);
  const user = useSessionState(state => state.user);

  const handleLogout = async () => {
    logout();
  };

  const guardar = async (values: ResetPasswordRequestProps, url: string) => {
    await reiniciarContrasena(
      {
        id: user?.id as string,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        newPasswordConfirmation: values.newPasswordConfirmation,
      },
      url,
    );
    success(successMsg);
    setTimeout(async () => {
      await handleLogout();
    }, 2000);
  };
  return (
    <MainCard xs={{ maxWidth: '1200px' }} title={cardTitle}>
      <div style={{ maxWidth: '40%', margin: '0 auto' }}>
        <ReinicioContrasenaFormulario
          onSubmit={values => guardar(values, urlEndpoint)}
          nombreFormulario={nameForm}
          hideCurrentPassword={true}
        />
        <Row>
          <Col>
            <Button
              form={nameForm}
              type="submit"
              variant="contained"
              style={{ marginTop: '20px' }}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </div>
    </MainCard>
  );
};

export default Pagina;
