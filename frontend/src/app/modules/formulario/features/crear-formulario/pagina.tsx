import * as yup from 'yup';
import { useNotification } from '@components/snackbar/use-notification.ts';
import FormularioBase from '../../components/FormularioBase';
import { FormularioDataEmpty, FormularioProps } from '../../common/types';
import { FormularioData } from '../../models/formulario.models';
import { crearFormulario } from './api';
import { EstadosFormularios } from '../../utils/estado-formularios';
import { useNavigate } from 'react-router';


// Validaciones
const schema = yup.object({
  nombreTecnico: yup
    .string()
    .required('Este campo es requerido')
    .max(200, 'Máximo 200 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras y números, sin espacios'),
  descripcion: yup
    .string()
    .required('Este campo es requerido')
    .max(2000, 'Máximo 2000 caracteres'),
  estadoItem: yup
    .object()
    .test('estado-valido', 'Este campo es requerido', function () {
      return this.parent.estado ? true : false;
    }),
  movilidadAsociadaItem: yup
    .object()
    .test('movilidad-valido', 'Este campo es requerido', function () {
      return this.parent.movilidadAsociada ? true : false;
    }),
});

interface CrearFormularioProps extends FormularioProps {
  nameForm: string;
  catalogs: any;
}

const Pagina = ({ onSuccess, nameForm, catalogs }: CrearFormularioProps) => {
  const { success } = useNotification();
  const navigate = useNavigate();

  const onSubmit = async (data: FormularioData) => {
   const result :any = await crearFormulario(data);
    success(`¡Formulario ${data.nombreTecnico} creado exitosamente!`);
    console.log(result);
    
    setTimeout(() => {
      onSuccess();
    }, 1000);
    navigate(`/formularios/${result?.id}/configurar`);
  };

  const initialValues = FormularioDataEmpty;
  const estadoInicial = EstadosFormularios[0];
  initialValues.estadoItem = estadoInicial;
  initialValues.estado = estadoInicial.id;
  initialValues.estadoNombre = estadoInicial.nombre;
  initialValues.versionFormulario = '1.0.0'

  return (
    <div>
      <FormularioBase
        loading={false}
        nameForm={nameForm}
        validations={schema}
        catalogs={catalogs}
        mode="create"
        onSubmit={onSubmit}
        defaultValues={initialValues}
      />
    </div>
  );
};

export default Pagina;
