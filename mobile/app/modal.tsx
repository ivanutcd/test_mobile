import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { Button, ButtonText } from '@/components/ui/button';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ItemModal() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [nombreTecnico, setNombreTecnico] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [formFields, setFormFields] = useState({});
  const [estado, setEstado] = useState('');
  const [versionFormulario, setVersionFormulario] = useState('');
  const [movilidadAsociada, setMovilidadAsociada] = useState('');
  const [unidad, setUnidad] = useState('');

  const [editMode, setEditMode] = useState(false);

  const database = useSQLiteContext();

  const navigation = useNavigation();

  React.useEffect(() => {
    if (id) {
      setEditMode(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const result = await database.getFirstAsync<{
      id: number;
      nombreTecnico: string;
      descripcion: string;
      formFields: object;
      estado: string;
      versionFormulario: string;
      movilidadAsociada: string;
      unidad: string;
    }>(`SELECT * FROM formularios WHERE id = ?`, [parseInt(id as string)]);
    setNombreTecnico(result?.nombreTecnico!);
    setDescripcion(result?.descripcion!);
    setFormFields(result?.formFields as object);
    setEstado(result?.estado!);
    setVersionFormulario(result?.versionFormulario!);
    setMovilidadAsociada(result?.movilidadAsociada!);
    setUnidad(result?.unidad!);
  };

  const handleSave = async () => {
    try {
      const response = await database.runAsync(
        `INSERT INTO formularios (nombreTecnico, descripcion, formFields, estado, versionFormulario, movilidadAsociada, unidad) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          nombreTecnico || 'Sin nombre',
          descripcion || 'Sin descripción',
          JSON.stringify(formFields),
          estado || 'Activo',
          versionFormulario || '1.0.0',
          movilidadAsociada || 'No',
          unidad || 'No',
        ],
      );
      console.log('Item saved successfully:', response?.changes!);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await database.runAsync(
        `UPDATE formularios SET nombreTecnico = ?, descripcion = ?, formFields = ?, estado = ?, versionFormulario = ?, movilidadAsociada = ?, unidad = ? WHERE id = ?`,
        [
          nombreTecnico,
          descripcion,
          JSON.stringify(formFields),
          estado,
          versionFormulario,
          movilidadAsociada,
          unidad,
          parseInt(id as string),
        ],
      );
      console.log('Item updated successfully:', response?.changes!);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          gap: 10,
          marginVertical: 10,
          width: '90%',
          paddingTop: 20,
        }}
      >
        <Text className="text-xl font-bold text-center">
          Renderizar Formulario
        </Text>
        <FormControl>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="bg-white rounded-xl"
          >
            <InputField
              placeholder="Nombre Tecnico"
              value={nombreTecnico}
              onChangeText={setNombreTecnico}
            />
          </Input>
        </FormControl>

        <FormControl>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="bg-white rounded-xl"
          >
            <InputField
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </Input>
        </FormControl>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          width: '90%',
        }}
      >
        <Button
          action="primary"
          className="bg-gray-200 rounded-xl h-10"
          variant="solid"
          size="lg"
          onPress={() => navigation.goBack()}
          style={{ width: '50%' }}
        >
          <ButtonText>Cancelar</ButtonText>
        </Button>
        <Button
          action="primary"
          className="bg-primary-500 rounded-xl  h-10"
          variant="solid"
          size="lg"
          onPress={() => {
            editMode ? handleUpdate() : handleSave();
          }}
          style={{ width: '50%' }}
        >
          <ButtonText>{editMode ? 'Actualizar' : 'Guardar'}</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    width: '100%',
  },

  button: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
