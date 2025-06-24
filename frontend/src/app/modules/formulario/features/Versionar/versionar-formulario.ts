import { useConfirmDialog } from '@components/dialog/confirm-dialog';
import { useNotification } from '@components/snackbar/use-notification.ts';
import { versionarFormulario } from './api';
import { VersionarFormularioData } from '../../models/formulario.models';

export function useVersionarFormulario() {
  const confirm = useConfirmDialog();
  const { success } = useNotification();

  const versionar = async (
    id: string,
    {
      onComplete,
      onCancel,
    }: {
      onComplete?: () => void;
      onCancel?: () => void;
    },
  ) => {
    const result = await confirm({
      description: `¿Está seguro de generar una nueva version del formulario?`,
    });

    if (result) {
      const request : VersionarFormularioData ={id};
      await versionarFormulario(request);
      await success(`¡Formulario versionado exitosamente!`);
      onComplete?.();
    } else {
      onCancel?.();
    }
  };

  return { versionar };
}
