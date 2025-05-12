import Formulario from '../../components/formulario';
import { EstadosFormularios } from '../../utils/estado-formularios';
import { EstadoFormularios } from '../../interfaces/formulario-form-props';
import { FormularioInterface } from '../../interfaces/formulario';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';

interface Props {
  id: string;
}
const VerFormulario = ({ id }: Props) => {
  const [{ data: formulario, loading }] = useObtenerFormularioById(id ?? '');

  if (loading || !formulario) return <></>;

  const initialData: FormularioInterface = {
    ...formulario,
    estado: EstadosFormularios.find(
      x => x.id === formulario.estado.toString(),
    ) as unknown as EstadoFormularios,
  };
  const nameForm = 'formulario';
  return (
    <>
      {' '}
      <Formulario
        valorInicial={initialData}
        onSubmit={form => {
          console.log(form);
        }}
        loading={false}
        nameForm={nameForm}
        viewMode={true}
      />
    </>
  );
};

export default VerFormulario;
