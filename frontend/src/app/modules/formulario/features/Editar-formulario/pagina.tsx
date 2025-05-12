import Formulario from '../../components/formulario';
import { EstadosFormularios } from '../../utils/estado-formularios';
import { EstadoFormularios } from '../../interfaces/formulario-form-props';
import { FormularioInterface } from '../../interfaces/formulario';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';
import { editarFormulario } from './api';
import { Box, Button } from '@mui/material';
import { useNotification } from '@components/snackbar/use-notification';
import { traducciones } from '../../common/translations';

interface Props {
  id: string;
  modal: (open: boolean) => void;
  recargar: () => void;
}
const EditarFormulario = ({ id, modal, recargar }: Props) => {
  const [{ data: formulario, loading }] = useObtenerFormularioById(id ?? '');
  const { success } = useNotification();
  if (loading || !formulario) return <></>;
  const guardar = async (formValues: FormularioInterface) => {
    const values: FormularioInterface = {
      ...formValues,
      id: id!,
    };
    editarFormulario(id, values).then(() => {
      success('Formulario editado correctamente');
      recargar();
      modal(false);
    });
  };
  const initialData: FormularioInterface = {
    ...formulario,
    estado: EstadosFormularios.find(
      x => x.id === formulario.estado.toString(),
    ) as unknown as EstadoFormularios,
  };
  const nameForm = 'editar-formulario';
  return (
    <>
      {' '}
      <Formulario
        valorInicial={initialData}
        onSubmit={guardar}
        loading={false}
        nameForm={nameForm}
        viewMode={false}
      />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          sx={{
            height: '40px',
            width: '154px',
            color: '#616161',
            borderColor: 'rgba(97, 97, 97, 0.26)',
            backgroundColor: '#FAFAFA',
          }}
          onClick={() => {
            modal(false);
          }}
        >
          Cerrar
        </Button>
        <Button
          form={nameForm}
          type="submit"
          sx={{
            height: '40px',
            width: '154px',
          }}
          variant="contained"
          color="primary"
        >
          {traducciones.EDITAR}
        </Button>
      </Box>
    </>
  );
};
export default EditarFormulario;
