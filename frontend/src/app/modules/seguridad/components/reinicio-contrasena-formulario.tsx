import { HookForm, InputText } from '@components/form';
import * as yup from 'yup';
import { Row } from '@components/ui-layout/row.tsx';
import { Col } from '@components/ui-layout/col.tsx';
import * as charLengths from '../common/charLengths';
import { ResetPasswordRequestProps } from '../common/types';

const validations = (hideCurrentPassword: boolean) => {
  return yup.object().shape({
    currentPassword: yup
      .string()
      .label('Contraseña actual')
      .test('required', 'Ingrese su contraseña actual', function (value) {
        if (!hideCurrentPassword) {
          return !!value;
        }
        return true;
      }),
    newPassword: yup
      .string()
      .required()
      .label('Nueva contraseña')
      .min(charLengths.MINPASSWORDLENGTH)
      .max(charLengths.MAXPASSWORDLENGTH)

      .matches(/[0-9]/, 'Debe contener al menos un número')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[^\w]/, 'Debe contener al menos un caracter especial')
      .trim(),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Las contraseñas deben coincidir')
      .required('La confirmación de la contraseña es obligatoria'),
  });
};

export const ReinicioContrasenaFormulario = ({
  nombreFormulario,
  onSubmit,
  hideCurrentPassword,
}: {
  onSubmit: (data: ResetPasswordRequestProps) => void;
  nombreFormulario: string;
  hideCurrentPassword?: boolean;
}) => {
  return (
    <>
      <HookForm
        nameForm={nombreFormulario}
        onSubmit={(data: ResetPasswordRequestProps) => {
          onSubmit({
            ...data,
          });
        }}
        validations={validations(!!hideCurrentPassword)}
      >
        {() => {
          return (
            <>
              <Row>
                <Col>
                  <InputText
                    label="Contraseña actual"
                    name="currentPassword"
                    placeholder="Contraseña Actual"
                    hidden={hideCurrentPassword}
                    style={{ paddingBottom: '5%' }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputText
                    name="newPassword"
                    type="password"
                    placeholder="Nueva contraseña"
                    style={{ paddingBottom: '5%' }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <InputText
                    name="newPasswordConfirmation"
                    type="password"
                    placeholder="Confirme contraseña"
                  />
                </Col>
              </Row>
              <div className="mt-2"></div>
            </>
          );
        }}
      </HookForm>
    </>
  );
};
