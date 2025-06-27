import { useEffect, useRef } from 'react';
import { insertRespuesta } from './formularioService';
import { SQLiteDatabase } from 'expo-sqlite';
import { debounce } from 'lodash';

export const useFormularioAutoSave = (
  db: SQLiteDatabase,
  respuesta: {
    id: string;
    formularioId: string;
    contenido: any;
    fecha: string;
  }
) => {
  const autoSave = useRef(
    debounce(async (data:any) => {
      await insertRespuesta(db, data);
    }, 5000) // Auto-save cada 5 segundos de inactividad
  ).current;

  useEffect(() => {
    autoSave(respuesta);
    return () => autoSave.cancel();
  }, [respuesta]);
};
