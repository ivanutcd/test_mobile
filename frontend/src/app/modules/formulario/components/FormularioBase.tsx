import { Grid } from '@mui/material';
import { FormularioData } from '../models/formulario.models';
import { ComboBox, HookForm, InputText } from '@components/form';
import { ModeFormulario } from '../common/types';
import { UseFormReturn } from 'react-hook-form';

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
            <Grid container spacing={2} p={1}>
              {/* Campo nombreTecnico */}
              <Grid item xs={12}>
                <InputText
                  label="Nombre Técnico"
                  name="nombreTecnico"
                  readOnly={isViewMode}
                />
              </Grid>

              {/* Campo descripcion */}
              <Grid item xs={12}>
                <InputText
                  label="Descripción"
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
                      label="Movilidad Asociada"
                      name="movilidadAsociadaNombre"
                      readOnly={isViewMode}
                    />
                  ) : (
                    <ComboBox
                      disableVariant
                      valueField="id"
                      labelField="nombre"
                      label="Movilidad Asociada"
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
                    label="Estado"
                    name="estadoNombre"
                    readOnly={true}
                  />
                ) : (
                  <ComboBox
                    disableVariant
                    valueField="id"
                    labelField="nombre"
                    label="Estado"
                    name="estadoItem"
                    items={catalogs?.estado_formulario ?? []}
                    whenChange={selectedItem => {
                      setValue('estado', selectedItem?.id ?? '');
                      trigger('estadoItem');
                    }}
                  />
                )}
              </Grid>
            </Grid>
          );
        }}
      </HookForm>
    </>
  );
};

export default FormularioBase;
