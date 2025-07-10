import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';

export const getAsignacionesDiarias = async (idUsuario: string) => {
  const db = useSQLiteContext();
  const result = await db.runAsync('SELECT * FROM asignaciones_diarias WHERE idUsuario = ?', [idUsuario]);
  return result;
};

type AsignacionExistente = {
  id: number;
  idUsuario: string;
  fechaAsignacion: string;
  sincronizado: number;
  detalle: string;
  estadoCaptura: string;
  fechaCaptura: string;
  estadoSincronizacion: string;
  clientFormId: string;
};
export const syncAsignacionesDiarias = async (db: SQLiteDatabase, userId: string) => {
    
  const fechaAsignacion = new Date().toISOString().split('T')[0];
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/v1/carga-trabajo-detalle/consultar-asignaciones-diarias?IdUsuario=${userId}&FechaAsignacion=${fechaAsignacion}`
  );

  if (response.status === 200) {
    const data = await response.json();
    console.log( 'data Response', data.data);
    

    const existente = await db.getFirstAsync<AsignacionExistente>(
        'SELECT id FROM asignaciones_diarias WHERE id = ?',
        [data.data.id],
      );

      if (!existente) {
        await db.runAsync(
          `INSERT INTO asignaciones_diarias 
            (id, idUsuario, fechaAsignacion, sincronizado, detalle, estadoCaptura,fechaCaptura,estadoSincronizacion,clientFormId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            data.data.id,
            data.data.idUsuario,
            data.data.fechaAsignacion,
            data.data.movilidad,
            data.data.sincronizado,
            data.data.detalle,
            data.data.estadoCaptura,
            data.data.fechaCaptura,
            data.data.estadoSincronizacion,
            data.data.clientFormId,
    
          ],
        );
      }



  
  }else{
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
  }

};