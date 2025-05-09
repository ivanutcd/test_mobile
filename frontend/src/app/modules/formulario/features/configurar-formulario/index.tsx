import { useState } from 'react';
import MainCard from '@common/ui-component/cards/main-card.tsx';
import FormBuilder from './FormBuilder';
import FormRender from './formRender';
import { GridContainer } from '@components/ui-layout/grid-container.tsx';
import { Col } from '@components/ui-layout/col.tsx';
import { FormField } from './formField';
import { useParams } from 'react-router-dom';

const ConfigurarFormulario = () => {
  const { id } = useParams();
  console.log(id);
  
  const [formData, setFormData] = useState<{
    formName: string;
    formDescription: string;
    formFields: FormField[];
  }>({
    formName: '',
    formDescription: '',
    formFields: [],
  });

  return (
    <MainCard title="Configurar Formulario" sx={{ minHeight: 'calc(100vh - 210px)' }}>
      <GridContainer>
        <Col xs={12} md={8}>
          <FormBuilder onFormChange={setFormData} />
        </Col>
        <Col xs={12} md={4}>
          <div className="form-render-container">
            <FormRender formData={formData} />
          </div>
        </Col>
      </GridContainer>
    </MainCard>
  );
};

export default ConfigurarFormulario;
