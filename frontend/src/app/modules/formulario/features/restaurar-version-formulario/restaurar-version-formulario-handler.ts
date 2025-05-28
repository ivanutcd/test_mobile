import { useConfirmDialog } from '@components/dialog/confirm-dialog';
import { useNotification } from '@components/snackbar/use-notification.ts';
import { restaurarVersionFormulario } from './api';

export function useRestaurarVersionFormularioHandler() {
  const confirm = useConfirmDialog();
  const { success } = useNotification();

  const publicar = async (
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
      description: `¿Está seguro de que desea restaurar esta versión obsoleta?`,
      confirmationText: 'Restaurar',
      cancellationText: 'Cancelar',
    });

    if (result) {
      await restaurarVersionFormulario(id);
      await success(`Formulario restaurado exitosamente.`);
      onComplete?.();
    } else {
      onCancel?.();
    }
  };

  return { publicar };
}
