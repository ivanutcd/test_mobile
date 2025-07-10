import { useEffect, useRef, useState } from 'react';
import { insertRespuesta } from './formularioService';
import { SQLiteDatabase } from 'expo-sqlite';
import { debounce } from 'lodash';

interface Respuesta {
  id: string;
  formularioId: string;
  contenido: any;
  fecha: string;
  enviada?: number;
}

export const useFormularioAutoSave = (
  db: SQLiteDatabase,
  respuesta: Respuesta
) => {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const autoSave = useRef(
    debounce(async (data: Respuesta) => {
      if (autoSaveEnabled) {
        await insertRespuesta(db, data);
      }
    }, 5000)
  ).current;

  useEffect(() => {
    autoSave(respuesta);
    return () => autoSave.cancel();
  }, [respuesta]);

 const guardarDefinitivo = async () => {
  autoSave.cancel(); 
  setAutoSaveEnabled(false); 

  const registros = await db.getAllAsync('SELECT * FROM respuestas');

  // Serializar el contenido actual para comparar
  const contenidoActual = JSON.stringify(respuesta.contenido);
  const yaExiste = registros.some((r: any) => {

    // Asegurar que el campo contenido existe
    const contenidoExistente = typeof r.contenido === 'string'
      ? r.contenido
      : JSON.stringify(r.contenido);
    return contenidoExistente === contenidoActual;
  });

  if (yaExiste) {
    return false;
  }

  await insertRespuesta(db, { ...respuesta, enviada: 1 });
  return true;
};


  return {
    guardarDefinitivo,
    autoSaveEnabled,
  };
};
