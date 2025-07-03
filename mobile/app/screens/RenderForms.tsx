import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TextStyle,
  Button,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { JSX } from 'react/jsx-runtime';

type FieldType = 'text' | 'number' | 'textarea' | 'date';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  inputLabel: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  rows?: number;
  min?: number;
  max?: number;
  position?: number;
}

interface FormData {
  formFields: FormField[];
  nombreTecnico: string;
  descripcion: string;
  movilidadAsociada: string;
}

interface Props {
  formData: FormData;
}

const DynamicForm = ({ formData }: Props) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [showDatePickers, setShowDatePickers] = useState<Record<string, boolean>>({});

  const handleChange = (id: string, value: string) => {
    setFormValues((prev: any) => ({ ...prev, [id]: value }));
  };

  const renderField: Record<FieldType, (field: FormField) => JSX.Element> = {
    text: (field) => (
      <TextInput
        key={field.id}
        style={styles.input}
        placeholder={field.placeholder}
        value={formValues[field.id] || ''}
        onChangeText={(text: string) => handleChange(field.id, text)}
      />
    ),

    number: (field) => (
      <TextInput
        key={field.id}
        style={styles.input}
        placeholder={field.placeholder}
        keyboardType="numeric"
        value={formValues[field.id] || ''}
        onChangeText={(text: string) =>
          handleChange(field.id, text.replace(/[^0-9]/g, ''))
        }
      />
    ),

    textarea: (field) => (
      <TextInput
        key={field.id}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder={field.placeholder}
        multiline
        numberOfLines={field.rows || 4}
        value={formValues[field.id] || ''}
        onChangeText={(text:any) => handleChange(field.id, text)}
      />
    ),

    date: (field) => (
      <View key={field.id}>
        <Text
          style={styles.input as TextStyle}
          onPress={() =>
            setShowDatePickers((prev: any) => ({ ...prev, [field.id]: true }))
          }
        >
          {formValues[field.id] || 'Seleccionar fecha'}
        </Text>
        {showDatePickers[field.id] && (
          <DateTimePicker
            value={
              formValues[field.id]
                ? new Date(formValues[field.id])
                : new Date()
            }
            mode="date"
            display="default"
            onChange={(event:any, selectedDate:any) => {
              setShowDatePickers((prev: any) => ({ ...prev, [field.id]: false }));
              if (selectedDate) {
                handleChange(
                  field.id,
                  selectedDate.toISOString().split('T')[0]
                );
              }
            }}
          />
        )}
      </View>
    ),
  };

  const handleGuardar = () => {
    console.log('📝 Formulario completado:', formValues);
    Alert.alert('Formulario guardado', JSON.stringify(formValues, null, 2));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.formTitle}>{formData.nombreTecnico}</Text>
      <Text style={styles.formDescription}>{formData.descripcion}</Text>

      {formData.formFields
        .sort((a: FormField, b: FormField) => (a.position || 0) - (b.position || 0))
        .map((field: FormField) => (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>
              {field.inputLabel || field.label}
              {field.required ? ' *' : ''}
            </Text>
            {renderField[field.type as FieldType]?.(field) || (
              <Text style={{ color: 'red' }}>
                Tipo no soportado: {field.type}
              </Text>
            )}
          </View>
        ))}

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleGuardar} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  formTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  formDescription: { marginBottom: 16 },
  fieldContainer: { marginBottom: 16 },
  label: { marginBottom: 8, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
});

export default DynamicForm;
function useState<T>(arg0: {}): [any, any] {
  throw new Error('Function not implemented.');
}

