import { useFormContext } from 'react-hook-form';

export interface ValidateStatus {
  hasError?: boolean;
  status?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  errorMsg: string;
}
export const useExtractedStatus = (name: string) => {
  const {
    formState: { errors, isDirty, isSubmitted, touchedFields },
  } = useFormContext();
  const errorComponent = errors[name];
  const touchComponent = touchedFields[name];

  const status = (
    isDirty || isSubmitted
      ? errorComponent
        ? { hasError: true, status: 'error', errorMsg: errorComponent.message }
        : isSubmitted || touchComponent
          ? { hasError: false, status: 'success' }
          : { hasError: false, status: undefined }
      : undefined
  ) as ValidateStatus;
  return status;
};
