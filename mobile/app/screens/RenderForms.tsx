import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, ScrollView as RNScrollView, TouchableOpacity } from 'react-native';
import {
  Text,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  Pressable
} from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'react-native';
import FileUpload from '@/components/FileUpload';
import Feather from 'react-native-vector-icons/Feather';
import { useFormularioAutoSave } from '@/src/features/formularios/useFormulario';
import { useSQLiteContext } from 'expo-sqlite';

export type FieldType = 'text' |
  'number' |
  'textarea' |
  'date' |
  'checkbox' |
  'radio' |
  'image' |
  'file';

export interface FormField {
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
  options?: { label: string; value: string }[];
}

export interface FormData {
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
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
  const db = useSQLiteContext();

  useEffect(() => {
    const cargarDatosGuardados = async () => {
      try {
        const respuestas = await db.getAllAsync("SELECT * FROM respuestas WHERE formularioId = ? AND enviada = 0", [formData.nombreTecnico]);

        if (respuestas.length > 0) {
          const ultima: any = respuestas[respuestas.length - 1];
          const contenido = JSON.parse(ultima.contenido);
          setFormValues(contenido);
        }
      } catch (error) {
        console.error("❌ Error al cargar datos guardados:", error);
      }
    };

    cargarDatosGuardados();
  }, [formData.nombreTecnico]);

  const handleChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const renderField = (field: FormField): JSX.Element => {
    const value = formValues[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Input style={styles.input}>
              <InputField
                style={styles.inputField}
                placeholder={field.placeholder}
                keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                value={value}
                onChangeText={(text: string) =>
                  handleChange(
                    field.id,
                    field.type === 'number' ? text.replace(/[^0-9]/g, '') : text
                  )
                }
              />
            </Input>
          </View>
        );

      case 'textarea':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Textarea style={styles.textarea}>
              <TextareaInput
                style={styles.textareaInput}
                placeholder={field.placeholder}
                value={value}
                onChangeText={(text: string) => handleChange(field.id, text)}
                numberOfLines={field.rows || 4}
              />
            </Textarea>
          </View>
        );

      case 'date':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Pressable onPress={() => setShowDatePicker(field.id)}>
              <Input style={styles.input} isReadOnly>
                <InputField
                  style={styles.inputField}
                  placeholder="Seleccionar fecha"
                  value={value}
                  pointerEvents="none"
                />
              </Input>
            </Pressable>
            {showDatePicker === field.id && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowDatePicker(null);
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
        );

      case 'checkbox':
        const selectedValues = value ? value.split(',') : [];

        return (
          <View key={field.id} style={styles.fieldContainer}>
            <CheckboxGroup
              value={selectedValues}
              onChange={(values: string[]) => handleChange(field.id, values.join(','))}
            >
              <View style={styles.optionsContainer}>
                {field.options?.map((option) => (
                  <View key={option.value} style={styles.optionItem}>
                    <Checkbox
                      value={option.value}
                      isChecked={selectedValues.includes(option.value)}
                      style={styles.checkbox}
                    >
                      <CheckboxIndicator style={{
                        width: 20,
                        height: 20,
                        borderWidth: 2,
                        borderColor: '#5FD0DF',
                        backgroundColor: selectedValues.includes(option.value) ? '#5FD0DF' : 'white',
                        borderRadius: 4,
                      }} />
                      <CheckboxLabel style={styles.optionLabel}>{option.label}</CheckboxLabel>
                    </Checkbox>
                  </View>
                ))}
              </View>
            </CheckboxGroup>
          </View>
        );


      case 'radio':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <RadioGroup
              value={value}
              onChange={(val: string) => handleChange(field.id, val)}
            >
              <View style={styles.optionsContainer}>
                {field.options?.map((option) => (
                  <View key={option.value} style={styles.optionItem}>
                    <Radio value={option.value} style={styles.radio}>
                      <RadioIndicator
                        style={[
                          styles.radioIndicator,
                          value === option.value && styles.radioCheckedIndicator
                        ]} />
                      <RadioLabel style={styles.optionLabel}>{option.label}</RadioLabel>
                    </Radio>
                  </View>
                ))}
              </View>
            </RadioGroup>
          </View>
        );

      case 'image':
        const selectedFilesImg = value ? value.split(',') : [];
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <FileUpload
              label={field.inputLabel}
              type="image/*"
              multiple={true}
              onChange={(files: any) => {
                const uris = files.map((f: any) => f.uri).join(',');
                handleChange(field.id, uris);
              }}
            />
            {selectedFilesImg.length > 0 && (
              <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                {selectedFilesImg.map((uri, index) => (
                  <View key={index} style={{ marginRight: 8, marginBottom: 8, position: 'relative' }}>
                    <Image
                      source={{ uri }}
                      style={{ width: 100, height: 100, borderRadius: 4 }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 12,
                        padding: 4,
                      }}
                      onPress={() => {
                        const newFiles = [...selectedFilesImg];
                        newFiles.splice(index, 1);
                        handleChange(field.id, newFiles.join(','));
                      }}
                    >
                      <Feather name="x" size={16} color="#ff4444" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 10, color: '#333', marginTop: 4, maxWidth: 100 }}>
                      {uri.split('/').pop()}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );

      case 'file':
        const selectedFiles = value ? value.split(',') : [];
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <FileUpload
              label={field.inputLabel}
              type="application/pdf"
              multiple={true}
              onChange={(files: any) => {
                const uris = files.map((f: any) => f.uri).join(',');
                handleChange(field.id, uris);
              }}
            />
            {selectedFiles.length > 0 && (
              <View style={{ marginTop: 8 }}>
                {selectedFiles.map((uri, index) => {
                  const fileName = uri.split('/').pop();
                  const fileExtension = fileName?.split('.').pop()?.toLowerCase();

                  let iconName = 'file';
                  if (fileExtension === 'pdf') iconName = 'file-text';
                  if (['doc', 'docx'].includes(fileExtension ?? '')) iconName = 'file-text';
                  if (['xls', 'xlsx'].includes(fileExtension ?? '')) iconName = 'file-text';
                  if (['ppt', 'pptx'].includes(fileExtension ?? '')) iconName = 'file-text';

                  return (
                    <View key={index} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                      backgroundColor: '#f5f5f5',
                      padding: 8,
                      borderRadius: 4,
                      position: 'relative'
                    }}>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );


      default:
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.errorText}>Tipo no soportado: {field.type}</Text>
          </View>
        );
    }
  };

  const respuesta = {
    id: "prueba1",
    formularioId: formData.nombreTecnico,
    contenido: formValues,
    fecha: new Date().toISOString()
  };

  const { guardarDefinitivo } = useFormularioAutoSave(db, respuesta);


  const handleGuardar = async () => {
    const fueGuardado = await guardarDefinitivo();

    if (fueGuardado) {
      Alert.alert('Guardado exitoso');
    } else {
      Alert.alert('Este formulario ya fue guardado con el mismo contenido');
    }

    const respuesta = await db.getAllAsync("SELECT * FROM respuestas");
    console.log('Formularios:', respuesta);
  };

  return (
    <RNScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{formData.nombreTecnico}</Text>
        <Text style={styles.description}>{formData.descripcion}</Text>

        {formData.formFields
          .sort((a, b) => (a.position || 0) - (b.position || 0))
          .map((field) => (
            <View key={field.id} style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                {field.inputLabel || field.label}
                {field.required && <Text style={styles.required}> *</Text>}
              </Text>
              {renderField(field)}
            </View>
          ))}

        <Pressable style={styles.submitButton} onPress={handleGuardar}>
          <Text style={styles.submitButtonText}>Guardar</Text>
        </Pressable>
      </View>
    </RNScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  formContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  radioCheckedIndicator: {
    backgroundColor: '#5FD0DF',
    borderColor: '#5FD0DF',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  required: {
    color: 'red',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  inputField: {
    height: 40,
    color: '#333',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    minHeight: 100,
  },
  textareaInput: {
    color: '#333',
    textAlignVertical: 'top',
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionItem: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    marginLeft: 8,
    color: '#333',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIndicator: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#5FD0DF',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#5FD0DF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
  uploadButton: {
    backgroundColor: '#5FD0DF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '500',
  },

});

export default DynamicForm;