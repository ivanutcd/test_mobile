import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box, View, Card, Text, HStack, Link } from '@gluestack-ui/themed';
import { Image, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { config as themeConfig } from '../../gluestack-style.config';
import { useAuth } from '@/src/context/AuthProvider';
import { useUserStore } from '@/src/store/useUserStore';

import {  useSQLiteContext } from 'expo-sqlite';

import { syncForms, getLastSyncDate, fetchSyncErrors } from '../functions/HomeScreenFunctions';
import { syncAsignacionesDiarias } from '../functions/getAsignacionesDiarias';

export default function HomeScreen() {
  const theme = themeConfig.themes.light.colors;
  const db = useSQLiteContext();
  const { isAuthenticated } = useAuth();
  const [ultimaSync, setUltimaSync] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const user = useUserStore((state) => state.user);

  const sincronizar = useCallback(async () => {
    console.log('Sincronizando formularios y asignaciones diarias');
    getLastSyncDate(db).then(async ()=>{
      await setUltimaSync(await getLastSyncDate(db));
      await syncForms(db, '749a01ce-344d-48a9-9aaa-298b76f17c4f');
      await syncAsignacionesDiarias(db, '749a01ce-344d-48a9-9aaa-298b76f17c4f');
    });

  }, [db, user]);

  const checkErrores = useCallback(async () => {
    const errores = await fetchSyncErrors(db);
    if (errores.length > 0) {
      console.warn('⚠️  Error en sincronización home screen:', errores[0].errorMensaje  );
    }
  }, [db]);

  useEffect(() => {
    sincronizar();
    checkErrores();
  }, [isAuthenticated, sincronizar, checkErrores]);

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
    await sincronizar();
    const ultima = await getLastSyncDate(db);
    setUltimaSync(ultima);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Box style={{ opacity: isSyncing ? 0.5 : 1 }}>
          <Text style={styles.title}>Última actualización</Text>
          <Text color={theme.primary} style={styles.Fecha} >
            {ultimaSync}
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
           Aqui se mostraran las asignaciones diarias de los formularios 
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
            <Text style={styles.verMas}>Ver más</Text>
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
