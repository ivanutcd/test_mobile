import { useEffect } from 'react';
import { FormularioProps } from '../../common/types';
import FormularioBase from '../../components/FormularioBase';

interface VisualizarFormularioProps extends FormularioProps {
  nameForm: string;
  catalogs: any;
  onPublicarFormulario: (fn: (id: string) => void) => void;
}

const VerFormulario = ({
  nameForm,
  initialValues,
  isLoading,
  onPublicarFormulario,
}: VisualizarFormularioProps) => {
  const publicarFormularioFn = (id: string) => {
    if (id) {
      // ejecuta evento,
      // onSuccess para refrescar la lista y cerrar modal
      // onCancel para cerrar modal
    }
  };

  useEffect(() => {
    if (onPublicarFormulario) {
      onPublicarFormulario(publicarFormularioFn);
    }
  }, [onPublicarFormulario]);

  return (
    <div>
      <FormularioBase
        loading={isLoading}
        nameForm={nameForm}
        mode="view"
        defaultValues={initialValues}
      />
    </div>
  );
};

export default VerFormulario;
