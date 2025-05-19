import { useState } from 'react';
import MainCard from '@common/ui-component/cards/main-card.tsx';
import FormBuilder from './FormBuilder';
import FormRender from './formRender';
import { FormType } from './FormType';
// import { GridContainer,Col } from '@proyectos-enee/enee_componentes';
import { GridContainer } from '@components/ui-layout/grid-container';
import { Col } from '@components/ui-layout/col';
import { FormField } from './formField';
import { useParams } from 'react-router-dom';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';

const ConfigurarFormulario = () => {
  const { id } = useParams();
  const [{ data: formulario }] = useObtenerFormularioById(id ?? '');
  console.log(formulario);

  const [formData, setFormData] = useState<{
    formFields: FormField[];
    estado: string;
    movilidadAsociada: string;
    nombreTecnico: string;
    descripcion: string;
  }>({
    formFields: (formulario as FormType)?.formFields ?? [],
    estado: formulario?.estado ?? '',
    movilidadAsociada: formulario?.movilidadAsociadaItem?.nombre ?? '',
    nombreTecnico: formulario?.nombreTecnico ?? '',
    descripcion: formulario?.descripcion ?? '',
  });

  return (
    <MainCard
      title={`Configurar ${formulario?.nombreTecnico ?? ''}`}
      sx={{ minHeight: 'calc(100vh - 210px)' }}
    >
      {formulario && (
        <GridContainer>
          <Col xs={12} md={8}>
            <FormBuilder
              onFormChange={setFormData}
              formData={formulario as FormType}
            />
          </Col>
          <Col xs={12} md={4}>
            <div className="form-render-container">
              <FormRender formData={formData} />
            </div>
          </Col>
        </GridContainer>
      )}
    </MainCard>
  );
};

export default ConfigurarFormulario;
