import { useEffect } from 'react';
import { FormularioProps } from '../../common/types';
import FormularioBase from '../../components/FormularioBase';
import { usePublicarFormularioHandler } from '../publicar-formulario/publicar-formulario-handler';
import { useNavigate } from 'react-router-dom';
import { EstadosFormularios, EstadosFormulariosEnum } from '../../utils/estado-formularios';

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
  onSuccess,
}: VisualizarFormularioProps) => {
  const { publicar } = usePublicarFormularioHandler();
  const navigate = useNavigate();
  const verConfiguracion = () => {
    if (initialValues?.estado !== EstadosFormulariosEnum.Borrador) {
      navigate(`/formularios/${initialValues?.id}/ver/configurar`)
    } else {
      navigate(`/formularios/${initialValues?.id}/configurar`);
    }
  };
  const publicarFormularioFn = (id: string) => {
    if (id) {
      publicar(id, {
        onComplete: () => {
          setTimeout(() => onSuccess?.(), 500);
        },
        onCancel: () => { },
      });
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
        onSubmit={verConfiguracion}
      />
    </div>
  );
};

export default VerFormulario;
