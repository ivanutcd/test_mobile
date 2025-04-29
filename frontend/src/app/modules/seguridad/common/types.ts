export interface ResetPasswordRequestProps {
  id: string;
  currentPassword?: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
