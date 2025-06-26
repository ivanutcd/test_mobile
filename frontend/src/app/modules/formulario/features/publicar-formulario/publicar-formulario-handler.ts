import { useConfirmDialog } from '@components/dialog/confirm-dialog';
import { useNotification } from '@components/snackbar/use-notification.ts';
import { publicarFormulario } from './api';

export function usePublicarFormularioHandler() {
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
      description: `¿Está seguro de realizar la publicación del formulario?`,
    });

    if (result) {
      await publicarFormulario(id);
      await success(`¡Formulario publicado exitosamente!`);
      onComplete?.();
    } else {
      onCancel?.();
    }
  };

  return { publicar };
}
