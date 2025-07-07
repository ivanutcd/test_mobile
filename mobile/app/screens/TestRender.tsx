import React from 'react';
import { SafeAreaView } from 'react-native';
import DynamicForm from './RenderForms';
import type { FieldType, FormData } from './RenderForms';

const mockFormData: FormData = {
    nombreTecnico: 'Formulario de prueba',
    descripcion: 'Rellene los siguientes campos',
    movilidadAsociada: 'cobro_prejuridico',
    formFields: [
        {
            id: '1',
            label: 'Nombre completo',
            inputLabel: 'Nombre completo',
            type: 'text' as FieldType,
            required: true,
            placeholder: 'Ingrese su nombre',
            position: 1,
        },
        {
            id: '2',
            label: 'Edad',
            inputLabel: 'Edad',
            type: 'number' as FieldType,
            required: true,
            placeholder: 'Ingrese su edad',
            min: 1,
            max: 120,
            position: 2,
        },
        {
            id: '3',
            label: 'Descripción',
            inputLabel: 'Descripción',
            type: 'textarea' as FieldType,
            placeholder: 'Ingrese una descripción',
            rows: 4,
            position: 3,
        },
        {
            id: '4',
            label: 'Fecha de nacimiento',
            inputLabel: 'Fecha de nacimiento',
            type: 'date' as FieldType,
            position: 4,
        },
        {
            id: 'sexo',
            type: 'radio',
            label: 'Sexo',
            inputLabel: 'Sexo',
            required: true,
            position: 6,
            options: [
                { label: 'Masculino', value: 'M' },
                { label: 'Femenino', value: 'F' },
            ],
        }

        , {
            id: 'hobbies',
            type: 'checkbox',
            label: 'Hobbies',
            inputLabel: 'Hobbies',
            position: 8,
            options: [
                { label: 'Leer', value: 'leer' },
                { label: 'Jugar', value: 'jugar' },
                { label: 'Dormir', value: 'dormir' },
            ],
        },
        {
            id: 'fotoPerfil',
            type: 'image',
            inputLabel: 'Foto de perfil',
            label: 'Foto de perfil',
            position: 7,
        },
        {
            id: 'documentoAdjunto',
            type: 'file',
            inputLabel: 'Documento adjunto',
            label: 'Documento adjunto',
            position: 5,
        }
    ],
};
const TestScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DynamicForm formData={mockFormData} />
        </SafeAreaView>
    );
};

export default TestScreen;