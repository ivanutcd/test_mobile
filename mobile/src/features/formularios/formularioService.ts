import { SQLiteDatabase } from 'expo-sqlite';

export const insertRespuesta = async (
  db: SQLiteDatabase,
  respuesta: {
    id: string;
    formularioId: string;
    contenido: any; 
    fecha: string;
    enviada?: number;
  }
) => {
  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO respuestas (id, formularioId, contenido, fecha, enviada)
       VALUES (?, ?, ?, ?, ?)`,
      [
        respuesta.id,
        respuesta.formularioId,
        JSON.stringify(respuesta.contenido),
        respuesta.fecha,
        respuesta.enviada ?? 0,
      ]
    );
  } catch (error) {
    console.error('Error al insertar respuesta:', error);
  }
};
