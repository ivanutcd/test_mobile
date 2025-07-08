import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  
} from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

export default function GetFormScreen() {
  const [data, setData] = useState<
    {
      id: string;
      nombreTecnico: string;
      descripcion: string;
      formFields: object;
      estado: string;
      versionFormulario: string;
      movilidadAsociada: string;
      unidad: string;
    }[]
  >([]);
  const database = useSQLiteContext();
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      loadData(); // Carga los datos cuando la pantalla está enfocada
    }, []),
  );

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate(`modal`, { id: 0 })}
        style={{ marginRight: 10 }}
      >
        <Ionicons name="add-circle" size={28} color="#5FD0DF" />
      </TouchableOpacity>
    ),
  });

  const loadData = async () => {
    const result = await database.getAllAsync<{
      id: string;
      nombreTecnico: string;
      descripcion: string;
      formFields: object;
      estado: string;
      versionFormulario: string;
      movilidadAsociada: string;
      unidad: string;
    }>('SELECT * FROM formularios');
    setData(result);
  };

  if (data.length === 0) {
    setData([
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nombreTecnico: 'Formulario de prueba',
        descripcion: 'Este es un formulario de prueba',
        formFields: {},
        estado: 'Activo',
        versionFormulario: '1.0.0',
        movilidadAsociada: 'Movilidad 1',
        unidad: 'Reconexión',
      },
    ]);
  }

  return (
    <View className="bg-white h-full">
      <View style={{ padding: 10 }} className="bg-white h-full">
        <FlatList
          data={data as any}
          renderItem={({
            item,
          }: {
            item: {
              id: string;
              nombreTecnico: string;
              descripcion: string;
              formFields: object;
              estado: string;
              versionFormulario: string;
              movilidadAsociada: string;
              unidad: string;
            };
          }) => (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View className="flex-1 max-w-full rounded-xl bg-gray-100 p-4">
                  <Text className="text-lg font-bold">
                    {item.nombreTecnico}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {item.descripcion}
                  </Text>

                  <Text className="text-sm text-gray-500">
                    {item.movilidadAsociada}
                  </Text>

                  <View style={styles.customChip}>
                    <Text className="text-sm text-white font-bold">
                      {item.unidad}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500  absolute bottom-2 right-2">
                    {item.versionFormulario}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
    alignContent: 'flex-end',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  customChip: {
    backgroundColor: '#5FD0DF',
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    color: '#fff',
    marginTop: 10,
  },
});
