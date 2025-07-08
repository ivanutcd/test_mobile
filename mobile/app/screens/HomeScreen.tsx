import {
  Box,
  Button,
  ButtonText,
  View,
  Card,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  LinkText,
} from '@gluestack-ui/themed';

import { Image, StyleSheet, Animated, Easing, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { config as themeConfig } from '../../gluestack-style.config';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/src/context/AuthProvider';
import { useUserStore } from '@/src/store/useUserStore';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';

type FormularioExistente = {
  versionFormulario: string;
};

const sincronizarFormularios = async (db: SQLiteDatabase, userId: string) => {
  try {
    const response = await fetch(
      `http://10.0.2.2:5090/api/v1/formulario/publicados?IdUsuario=${userId}`,
    );
    const { data: formularios } = await response.json();
    for (const f of formularios) {
      const estructura = f.estructuraFormulario
        ? JSON.parse(f.estructuraFormulario)
        : null;

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
      } else if (existente?.versionFormulario !== f.versionFormulario) {
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

    console.log('Sincronización completada');
  } catch (err) {
    let mensajeError = 'Error desconocido';
    if (err instanceof Error) {
      mensajeError = err.message;
    }

    console.error('Error en sincronización:', mensajeError);

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

const fetchErroresSincronizacion = async (
  db: SQLiteDatabase,
): Promise<SincronizacionError[]> => {
  return await db.getAllAsync(
    `SELECT * FROM sincronizaciones WHERE tipo = 'formularios' AND exito = 0 ORDER BY fecha DESC LIMIT 1`,
  );
};

const obtenerUltimaFechaSync = async (db: SQLiteDatabase): Promise<string> => {
  const res = await db.getFirstAsync<{ valor: string }>(
    `SELECT valor FROM configuraciones WHERE clave = 'ultima_sincronizacion_formularios'`,
  );
  return res?.valor || '';
};

export default function HomeScreen() {
  const theme = themeConfig.themes.light.colors;
  const db = useSQLiteContext();
  const { isAuthenticated } = useAuth();
  const [ultimaSync, setUltimaSync] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const sincronizar = async () => {
      obtenerUltimaFechaSync(db).then(setUltimaSync);
      await sincronizarFormularios(db, '749a01ce-344d-48a9-9aaa-298b76f17c4f');
    };
    sincronizar();
  }, [isAuthenticated]);

  useEffect(() => {
    const checkErrores = async () => {
      const errores = await fetchErroresSincronizacion(db);
      if (errores.length > 0) {
        console.warn('⚠️ Error de sincronización:', errores[0].errorMensaje);
      }
    };
    checkErrores();
  }, []);

  useEffect(() => {
    if (isSyncing) {
      spinAnim.setValue(0);
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000, // 3 segundos
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        spinAnim.setValue(0);     // Vuelve a posición inicial
        setIsSyncing(false);      // Finaliza el estado de sync
      });
    }
  }, [isSyncing]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const onSyncPress = async () => {
    setIsSyncing(true);
    await sincronizarFormularios(
      db,
      '749a01ce-344d-48a9-9aaa-298b76f17c4f',
    );
    const ultima = await obtenerUltimaFechaSync(db);
    setUltimaSync(ultima);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Box style={{ opacity: isSyncing ? 0.5 : 1 }}>
          <Text style={styles.title}>Última actualización</Text>
          <Text color={theme.primary} style={styles.Fecha} >
            {ultimaSync ? new Date(ultimaSync).toLocaleString() : 'N/D'}
          </Text>
        </Box>
       
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
          }}
        >
          <MaterialIcons
            name="sync"
            size={34}
            color={theme.primary}
            onPress={onSyncPress}
          />
        </Animated.View>
      </Card>
      <Card style={styles.asignaciones}>
        <HStack
          style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}
        >
          <Box style={styles.icon} className="bg-primary w-10 h-10">
            <MaterialIcons name="assignment" size={24} color={theme.primary} />
          </Box>
          <Box className="flex-1 w-full">
            <Text style={styles.title}>Asignaciones</Text>
            <Text fontWeight="light" color="#525252">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </Text>
          </Box>
          <Box className="w-10 justify-center items-center h-full">
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              style={styles.refresh}
              color={theme.primary}
            />
          </Box>
        </HStack>
      </Card>
      <Box>
        <Box className="flex-row justify-between align-center items-center">
          <Text style={styles.title}>Formularios en progreso </Text>
          <Link>
            <LinkText style={styles.verMas}>Ver más</LinkText>
          </Link>
        </Box>
        <Card style={styles.asignaciones} className="mt-4"></Card>
      </Box>
      <Text>Usuario: {user?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asignaciones: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    height: 100,
  },
  refresh: {
    position: 'absolute',
    right: 10,
  },
  Fecha: {
    fontSize: 12,
    backgroundColor: '#5FD0DF1A',
    borderRadius: 10,
    padding: 5,
    color: '#5FD0DF',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: '#5FD0DF',
  },
  icon: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    aspectRatio: 1,
    width: 50,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verMas: {
    fontSize: 12,
    color: '#5FD0DF',
    textDecorationLine: 'underline',
  },
  animatedStyle: {

    transform: [{ rotate: '360deg' }],
  },
});



