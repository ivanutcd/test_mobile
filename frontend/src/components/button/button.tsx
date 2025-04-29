import AnimateButton from '@common/ui-component/extended/animate-button';
import { Button as Btn, ButtonProps } from '@mui/material';
import { Action, strategies } from '@components/button/types/strategies.tsx';
interface MyProps extends ButtonProps {
  actions?: Action;
}
export const Button = ({ actions, ...props }: MyProps) => {
  const strategy = strategies.find(strategy => strategy.action === actions);
  if (!strategy) {
    return (
      <AnimateButton>
        <Btn
          color="primary"
          variant={'contained'}
          sx={{ boxShadow: 'none' }}
          {...props}
        />
      </AnimateButton>
    );
  }
  return (
    <Button
      color={
        strategy.color as
          | 'primary'
          | 'inherit'
          | 'secondary'
          | 'success'
          | 'error'
          | 'info'
          | 'warning'
      }
      variant={strategy.variant as 'text' | 'outlined' | 'contained'}
      sx={{ boxShadow: 'none' }}
      {...props}
    >
      {strategy.action}
    </Button>
  );
};
