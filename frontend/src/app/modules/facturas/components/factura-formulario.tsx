import { ComboBox, DatePicker, HookForm, InputText } from '@components/form';
import { Grid } from '@mui/material';

import * as yup from 'yup';
import { Row } from '@components/ui-layout/row.tsx';
import { Col } from '@components/ui-layout/col.tsx';
import { Factura } from '../models/factura.model.ts';
import { FacturaForm } from '../models/factura-form.model.ts';
import { CatalogoItem } from '@common/catalog/catalogo-item.model.ts';

const validations = yup.object({
  numero: yup.string().label('Número de factura').required(),
  fecha: yup.date().afterOrEqualNow().required(),
  estatus: yup.object().required(),
});

interface Props {
  initialValues?: Factura;
  nombreFormulario: string;
  onSubmit: (values: Partial<Factura>) => void;
}

const datos: CatalogoItem[] = [
  { nombre: 'Borrador', id: 'borrador' },
  { nombre: 'Facturado', id: 'facturado' },
];

export const FacturaFormulario = ({
  nombreFormulario,
  onSubmit,
  initialValues,
}: Props) => {
  const guardar = (values: FacturaForm) => {

    onSubmit({
      numero: values.numero,
      fechaEmision: values.fecha,
      estadoId: values.estatus.id,
    });
  };

  const formValues: FacturaForm | undefined = initialValues
    ? {
        numero: initialValues.numero,
        fecha: initialValues.fechaEmision,
        estatus: datos.find(x => x.id == initialValues.estadoId),
      } as FacturaForm
    : undefined;

  return (
    <>
      <HookForm
        initialValues={formValues}
        nameForm={nombreFormulario}
        onSubmit={guardar}
        validations={validations}
      >
        {() => {
          return (
            <>
              <Grid container spacing={3}>
                <Row>
                  <Col>
                    <InputText label="Numero" name="numero" />
                  </Col>
                  <Col>
                    <DatePicker
                      label="Fecha"
                      name="fecha"
                      placeholder="Seleccione fecha"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ComboBox
                      valueField="id"
                      labelField="nombre"
                      label="Estatus"
                      name="estatus"
                      items={datos}
                      placeholder={'Estatus'}
                    />
                  </Col>
                </Row>
              </Grid>
            </>
          );
        }}
      </HookForm>
    </>
  );
};
