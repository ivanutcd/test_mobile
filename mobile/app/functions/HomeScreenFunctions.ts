import { SQLiteDatabase } from 'expo-sqlite';

type FormularioExistente = {
  versionFormulario: string;
};



export const syncForms = async (db: SQLiteDatabase, userId: string) => {

console.log( process.env.BASE_URL_API);
console.log(userId);
console.log( `${process.env.BASE_URL_API}/api/v1/formulario/publicados?IdUsuario=749a01ce-344d-48a9-9aaa-298b76f17c4f`);
    try {
   
      const response = await fetch(
        // `${process.env.BASE_URL_API}/api/v1/formulario/publicados?IdUsuario=${userId}`
        `${process.env.BASE_URL_API}/api/v1/formulario/publicados?IdUsuario=749a01ce-344d-48a9-9aaa-298b76f17c4f`
      );

    
  
      const json = await response.json();
  
      console.log('Respuesta de la API:', JSON.stringify(json, null, 2));
  
      const formularios = Array.isArray(json?.data) ? json.data : [];
  
      if (formularios.length === 0) {
        console.warn('⚠️ La API no devolvió formularios o el formato es incorrecto.');
      }
  
      for (const f of formularios) {
        let estructura = null;
        try {
          estructura = f.estructuraFormulario
            ? JSON.parse(f.estructuraFormulario)
            : null;
        } catch (parseErr) {
          console.warn(`⚠️ Error al parsear estructuraFormulario del formulario ${f.id}:`, parseErr);
          continue; // saltar este formulario
        }
  
        const formFields = estructura?.formFields || [];
  
        const existente = await db.getFirstAsync<FormularioExistente>(
          'SELECT versionFormulario FROM formularios WHERE id = ?',
          [f.id],
        );
  
        if (!existente) {
          await db.runAsync(
            `INSERT INTO formularios 
              (id, nombreTecnico, descripcion, formFields, estado, versionFormulario, movilidadAsociada, unidad, fechaActualizacion) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
            [
              f.id,
              estructura?.nombreTecnico || '',
              estructura?.descripcion || '',
              JSON.stringify(formFields),
              'publicado',
              f.versionFormulario,
              estructura?.movilidadAsociada || '',
              estructura?.unidad || '',
            ],
          );
        } else if (existente.versionFormulario !== f.versionFormulario) {
          await db.runAsync(
            `UPDATE formularios 
              SET nombreTecnico = ?, descripcion = ?, formFields = ?, estado = ?, versionFormulario = ?, movilidadAsociada = ?, unidad = ?, fechaActualizacion = datetime('now') 
              WHERE id = ?`,
            [
              estructura?.nombreTecnico || '',
              estructura?.descripcion || '',
              JSON.stringify(formFields),
              'publicado',
              f.versionFormulario,
              estructura?.movilidadAsociada || '',
              estructura?.unidad || '',
              f.id,
            ],
          );
        }
      }
  
      await db.runAsync(
        `INSERT OR REPLACE INTO configuraciones (clave, valor) VALUES (?, datetime('now'))`,
        ['ultima_sincronizacion_formularios'],
      );
  
      await db.runAsync(
        `INSERT INTO sincronizaciones (tipo, fecha, exito, errorMensaje) VALUES (?, datetime('now'), ?, ?)`,
        ['formularios', 1, null],
      );
  
      console.log('Sincronización completada con éxito');
    } catch (err) {
      console.log( err);
      const mensajeError = err instanceof Error ? err.message : 'Error desconocido';


      await db.runAsync(
        `INSERT INTO sincronizaciones (tipo, fecha, exito, errorMensaje) VALUES (?, datetime('now'), ?, ?)`,
        ['formularios', 0, mensajeError],
      );
    }
  };

type SincronizacionError = {
  id: number;
  tipo: string;
  fecha: string;
  exito: number;
  errorMensaje: string;
};

export const fetchSyncErrors = async (
  db: SQLiteDatabase,
): Promise<SincronizacionError[]> => {
  return await db.getAllAsync(
    `SELECT * FROM sincronizaciones WHERE tipo = 'formularios' AND exito = 0 ORDER BY fecha DESC LIMIT 1`,
  );
};

export const getLastSyncDate = async (db: SQLiteDatabase): Promise<string> => {
console.log('Obteniendo la última fecha de sincronización');
  const res = await db.getFirstAsync<{ valor: string }>(
    `SELECT valor FROM configuraciones WHERE clave = 'ultima_sincronizacion_formularios'`,
  );
  return res?.valor || '';
};
