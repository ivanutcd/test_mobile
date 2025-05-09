import { HookForm, ComboBox, InputText } from '@components/form';
import { Col } from '@components/ui-layout/col';
import { GridContainer } from '@components/ui-layout/grid-container';
import { Row } from '@components/ui-layout/row';
import { FormularioFormProps } from '../interfaces/formulario-form-props';
import { EstadosFormularios } from '../utils/estado-formularios';

const Formulario = ({
  valorInicial,
  onSubmit,
  loading,
  nameForm,
  viewMode,
}: FormularioFormProps) => {
  return (
    <>
      <HookForm
        nameForm={nameForm}
        isLoading={loading}
        initialValues={valorInicial}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <GridContainer>
              <Row>
                <Col>
                  <InputText
                    label="Nombre técnico"
                    name="nombreTecnico"
                    readOnly={viewMode}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputText
                    label="Descripción"
                    name="descripcion"
                    readOnly={viewMode}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputText
                    label="Movilidad asociada"
                    name="movilidadAsociada"
                    readOnly={viewMode}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ComboBox
                    disableVariant
                    label="Estado"
                    name="estado"
                    valueField="id"
                    labelField="nombre"
                    items={EstadosFormularios ?? []}
                    disabled={viewMode}
                  />
                </Col>
              </Row>
              
            </GridContainer>
          );
        }}
      </HookForm>
    </>
  );
};

export default Formulario;
