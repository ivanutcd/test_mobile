import Formulario from '../../components/formulario';
import { EstadosFormularios } from '../../utils/estado-formularios';
import { EstadoFormularios } from '../../interfaces/formulario-form-props';
import { FormularioInterface } from '../../interfaces/formulario';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';
import { useParams } from 'react-router-dom';
import BaseTemplate from '@components/baseTemplate/baseTemplate';

const Pagina = () => {
  const params = useParams();
  const [{ data: formulario, loading }] = useObtenerFormularioById(
    params.id ?? '',
  );

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
      <BaseTemplate title="Formulario" divider={true}>
        <Formulario
          valorInicial={initialData}
          onSubmit={form => {
            console.log(form);
          }}
          loading={false}
          nameForm={nameForm}
          viewMode={true}
        />
      </BaseTemplate>
    </>
  );
};

export default Pagina;
