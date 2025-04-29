import { useConfirm } from 'material-ui-confirm';
import * as React from 'react';

import { DialogContentProps } from '@mui/material/DialogContent';
import { DialogProps } from '@mui/material/Dialog';
import { DialogActionsProps } from '@mui/material/DialogActions';
import { ButtonProps } from '@mui/material/Button';
import { TextFieldProps } from '@mui/material/TextField';
import { DefaultContent } from '@components/dialog/default-content.tsx';

interface ConfirmOptions {
  title?: React.ReactNode;
  description: React.ReactNode;
  content?: React.ReactNode | null;
  contentProps?: DialogContentProps;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  confirmationTextProps?: React.ReactNode;
  dialogProps?: Omit<DialogProps, 'open'>;
  dialogActionsProps?: DialogActionsProps;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  allowClose?: boolean;
  confirmationKeyword?: string;
  confirmationKeywordTextFieldProps?: TextFieldProps;
  hideCancelButton?: boolean;
  buttonOrder?: string[];
}

export const useConfirmDialog = () => {
  const confirm = useConfirm();
  return (options?: ConfirmOptions) =>
    new Promise<boolean>(resolve => {
      confirm({
        ...options,
        title: undefined,
        description: undefined,
        confirmationText: options?.confirmationText ?? 'Si',
        cancellationText: options?.cancellationText ?? 'No',
        content: (
          <DefaultContent
            title={options?.title ?? '¿Estás Seguro?'}
            description={options?.description}
          />
        ),
        confirmationButtonProps: {
          color: 'primary',
          variant: 'contained',
          sx: { color: 'primary.light', boxShadow: 'none' },
        },
        cancellationButtonProps: {
          color: 'inherit',
          variant: 'contained',
          sx: { color: '#9e9e9e', boxShadow: 'none' },
        },
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
};
