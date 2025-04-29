import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogProps {
  modalTitle: string;
  children: React.ReactNode;
  actions?: ActionButtonProps[];
  open: boolean;
  handleClose: () => void;
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant: 'text' | 'outlined' | 'contained';
  color: string;
}

const CustomModal = ({
  modalTitle,
  children,
  actions,
  open,
  handleClose,
}: DialogProps) => {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          variant="h3"
          sx={{ m: 0, p: 2, pr: 6 }}
          id="customized-dialog-title"
        >
          {modalTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{children}</DialogContent>
        {actions && actions.length > 0 && (
          <DialogActions>
            {actions?.map((item, index) => (
              <Button
                key={index}
                autoFocus={index === 0}
                onClick={item.onClick}
                variant={item.variant}
                sx={{ color: item.color }}
              >
                {item.label}
              </Button>
            ))}
          </DialogActions>
        )}
      </BootstrapDialog>
    </>
  );
};

export default CustomModal;
