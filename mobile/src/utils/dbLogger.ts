import { SQLiteDatabase } from 'expo-sqlite';

export const insertarLogEvento = async (
  db: SQLiteDatabase,
  idUsuario: string,
  modulo: string,
  accion: string,
  detalle: string,
  sincronizado: number = 0,
) => {
  try {
    const fechaActual = new Date().toISOString();
    await db.runAsync(
      `INSERT INTO logs_eventos (
          idUsuario, modulo, accion, detalle, sincronizado, fechaUltIntentoSincronizacion
        ) VALUES (?, ?, ?, ?, ?, ?)`,
      [idUsuario, modulo, accion, detalle, sincronizado, fechaActual],
    );

    console.log(`Log insertado correctamente: ${accion} en módulo ${modulo}`);
    console.log(`usuario ${idUsuario}`);
  } catch (error) {
    console.error('Error al insertar log:', error);
  }
};
