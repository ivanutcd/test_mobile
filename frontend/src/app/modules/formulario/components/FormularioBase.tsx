import { Grid } from '@mui/material';
import { FormularioData } from '../models/formulario.models';
import { ComboBox, HookForm, InputText } from '@components/form';
import { ModeFormulario } from '../common/types';
import { UseFormReturn } from 'react-hook-form';
import traducciones from '../common/translations';
import { useMemo } from 'react';

export interface FormularioBaseProps {
  loading: boolean;
  nameForm: string;
  validations?: any;
  catalogs?: any;
  mode: ModeFormulario;
  defaultValues?: FormularioData;
  onSubmit?: (data: any) => void;
}

const FormularioBase = ({
  onSubmit,
  defaultValues,
  validations,
  catalogs,
  loading,
  nameForm,
  mode,
}: FormularioBaseProps) => {
  const isViewMode = mode === 'view';
  const isEditable = useMemo(() => {
  if (mode === 'create') return true;
    console.log(defaultValues?.esEditable);
    
  if (
    mode === 'edit' &&
    defaultValues?.nombreTecnico &&
    defaultValues?.updatedDate !== undefined
  ) {
    return defaultValues.nombreTecnico.startsWith('copia_de_') && defaultValues?.esEditable;
  }

  return false;
}, [mode, defaultValues]);

  return (
    <>
      <HookForm
        nameForm={nameForm}
        isLoading={loading}
        initialValues={defaultValues}
        onSubmit={onSubmit}
        validations={validations}
      >
        {({ setValue, trigger }: UseFormReturn<FormularioData>) => {
          return (
            <Grid container spacing={2} p={0} sx={{ marginTop: '5px' }}>
              {/* Campo nombreTecnico */}
              <Grid item xs={12}>
                <InputText
                  label={traducciones.NOMBRE_TECNICO}
                  name="nombreTecnico"
                  readOnly={!isEditable}
                />
              </Grid>

              {/* Campo descripcion */}
              <Grid item xs={12}>
                <InputText
                  label={traducciones.DESCRIPCION}
                  name="descripcion"
                  readOnly={isViewMode}
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Campo movilidadAsociada */}
              <Grid item xs={12}>
                <Grid item xs={12}>
                  {isViewMode ? (
                    <InputText
                      label={traducciones.MOVILIDAD_ASOCIADA}
                      name="movilidadAsociadaNombre"
                      readOnly={isViewMode}
                    />
                  ) : (
                    <ComboBox
                      disableVariant
                      valueField="id"
                      labelField="nombre"
                      label={traducciones.MOVILIDAD_ASOCIADA}
                      name="movilidadAsociadaItem"
                      items={catalogs?.tipo_movilidad ?? []}
                      whenChange={selectedItem => {
                        setValue('movilidadAsociada', selectedItem?.id ?? '');
                        trigger('movilidadAsociadaItem');
                      }}
                    />
                  )}
                </Grid>
              </Grid>

              {/* Campo estado */}
              <Grid item xs={12}>
                {isViewMode ? (
                  <InputText
                    label={traducciones.ESTADO}
                    name="estadoNombre"
                    readOnly={true}
                  />
                ) : (
                  <ComboBox
                    disableVariant
                    valueField="id"
                    labelField="nombre"
                    label={traducciones.ESTADO}
                    name="estadoItem"
                    items={catalogs?.estado_formulario ?? []}
                    whenChange={selectedItem => {
                      setValue('estado', selectedItem?.id ?? '');
                      trigger('estadoItem');
                    }}
                    disabled={true}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <InputText
                  label={traducciones.VERSION}
                  name="versionFormulario"
                  readOnly={true}
                  value={defaultValues?.versionFormulario}
                />
              </Grid>
            </Grid>
          );
        }}
      </HookForm>
    </>
  );
};

export default FormularioBase;
