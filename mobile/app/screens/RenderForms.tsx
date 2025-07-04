import React, { useState } from 'react';
import { Alert, StyleSheet, View, ScrollView as RNScrollView } from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export type FieldType = 'text' |
                      'number' |
                    'textarea' | 
                        'date' |
                    'checkbox' | 
                       'radio' | 
                        'image'| 
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
        console.log(`✔️ ${field.id}:`, selectedValues); // DEBUG

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
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Pressable
              style={styles.uploadButton}
              onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 0.7,
                  base64: false,
                });

                if (!result.canceled) {
                  const uri = result.assets[0].uri;
                  handleChange(field.id, uri);
                }
              }}
            >
              <Text style={styles.uploadButtonText}>
                {value ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </Text>
            </Pressable>
            {value ? (
              <Image
                source={{ uri: value }}
                style={{ width: 100, height: 100, marginTop: 10, borderRadius: 8 }}
              />
            ) : null}
          </View>
        );

      case 'file':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Pressable
              style={styles.uploadButton}
              onPress={async () => {
                const result = await DocumentPicker.getDocumentAsync({
                  type: '*/*',
                  copyToCacheDirectory: true,
                });

                if (result.assets && result.assets[0]) {
                  handleChange(field.id, result.assets[0].uri);
                }
              }}
            >
              <Text style={styles.uploadButtonText}>
                {value ? 'Cambiar archivo' : 'Seleccionar archivo'}
              </Text>
            </Pressable>
            {value ? (
              <Text style={{ marginTop: 8, fontSize: 12, color: '#333' }}>
                Archivo seleccionado: {value.split('/').pop()}
              </Text>
            ) : null}
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

  const handleGuardar = () => {
    console.log('📝 Formulario guardado:', formValues);
    Alert.alert('Guardado', JSON.stringify(formValues, null, 2));
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