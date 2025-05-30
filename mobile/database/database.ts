import { SQLiteDatabase } from 'expo-sqlite';

export const createDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log('Creando base de datos');
  try {
    const response = await db.execAsync(
      ` CREATE TABLE IF NOT EXISTS formularios (
        id TEXT PRIMARY KEY NOT NULL,
        nombreTecnico TEXT,
        descripcion TEXT,
        formFields JSON,
        estado TEXT,
        versionFormulario TEXT,
        movilidadAsociada TEXT,
        unidad TEXT
      );
      CREATE TABLE IF NOT EXISTS respuestas (
        id TEXT PRIMARY KEY NOT NULL,
        formularioId TEXT,
        contenido JSON,
        fecha TEXT,
        enviada INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS catalogos (
        id TEXT PRIMARY KEY NOT NULL,
        nombre TEXT,
        datos TEXT
      );
      CREATE TABLE IF NOT EXISTS configuraciones (
        clave TEXT PRIMARY KEY NOT NULL,
        valor TEXT
      );`,
    );

    console.log(
      'Base de datos creada Formularios y tablas secundarias',
      response,
    );
  } catch (error) {
    console.error('Error creating database:', error);
  }
};
