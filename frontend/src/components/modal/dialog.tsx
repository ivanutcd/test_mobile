
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BoxContainer } from '@components/ui-layout/box-container.tsx';
import React from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialogContent-root': {
    padding: theme.spacing(0),
  }
  
}));

export interface DialogProps {
  modalTitle: string;
  children: React.ReactNode;
  actions?: ActionButtonProps[];
  open: boolean;
  handleClose: () => void;
  fullScreen?: boolean;
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant: 'text' | 'outlined' | 'contained';
  color: string;
  type:string;
}

const CustomModal = ({
  fullScreen,
  modalTitle,
  children,
  open,
  handleClose,
}: DialogProps) => {

  const emitHandleClose = () => {
    handleClose();
  };

  return (
    <>
      <BootstrapDialog
        onClose={emitHandleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={fullScreen}
        maxWidth="lg"
      >
        <DialogTitle
          variant="h4"
          sx={{ m: 0, p: 2, pr: 6 }}
          id="customized-dialog-title"
        >
          {modalTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={emitHandleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers > 
          <BoxContainer display="flex"  flexDirection="column" gap={2} padding={2}>
            {children}
           
          </BoxContainer>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default CustomModal;
