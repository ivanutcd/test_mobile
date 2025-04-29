import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  useForm,
  UseFormReturn,
  ValidationMode,
} from 'react-hook-form';

import { configHookForm } from './config.ts';

import { yupResolver } from '@hookform/resolvers/yup';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export interface HookFormProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit?: Function;
  onErrorSubmit?: SubmitErrorHandler<FieldValues>;
  validations?: any;
  children?: any;
  initialValues?: any;
  nameForm?: string;
  validationMode?: keyof ValidationMode;
  isLoading?: boolean;
}
export type HookFormMethods = UseFormReturn;

export const LoadingForm = () => {
  const d = useForm();
  d.register('$$isLoading');
  return <></>;
};

type HookFormSkeletonProps = HookFormProps & { loadingComponente: any };
export const HookFormSkeleton = (props: HookFormSkeletonProps) => {
  return <HookFormImpl {...props} />;
};

export const HookFormImpl = (props: HookFormProps) => {
  const methods = useForm({
    resolver: props.validations ? yupResolver(props.validations) : undefined,

    defaultValues: props.initialValues ? props.initialValues : {},
    mode: props.validationMode ? props.validationMode : 'onChange',
  });

  const { formState } = methods;

  const submit = async (data: any) => {
    //  alert('submit');
    if (props.onSubmit) {
      props?.onSubmit(data, methods.reset);
      await sleep(configHookForm.submitDelay);
    }
  };

  const childrenProps: HookFormMethods = {
    ...methods,
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          noValidate
          autoComplete="off"
          // layout={'vertical'}
          id={props.nameForm}
          onSubmitCapture={
            formState.isSubmitting
              ? e => {
                  e.preventDefault();
                }
              : methods.handleSubmit(d => submit(d), props.onErrorSubmit)
          }
        >
          {props.children(childrenProps)}
        </form>
      </FormProvider>
    </>
  );
};

export const HookForm = (props: HookFormProps) => {
  if (props.isLoading) {
    return (
      <HookFormSkeleton
        {...props}
        loadingComponente={<LoadingForm />}
        initialValues={{ $isloading: props.isLoading }}
      />
    );
  }
  return <HookFormImpl {...props} />;
};
