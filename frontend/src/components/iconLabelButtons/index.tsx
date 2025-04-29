import { Stack } from '@mui/material';
import { Button } from '../button/button';
import { IconLabelButtonsProps } from './props';

const IconLabelButtons = ({
  icon: Icon,
  create = () => console.log('Clicked'),
}: IconLabelButtonsProps) => {
  return (
    <Stack direction="row">
      <Button onClick={create}>
        <Icon />
      </Button>
    </Stack>
  );
};

export default IconLabelButtons;
