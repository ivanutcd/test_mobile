import { Box } from '@mui/system';

export const BoxContainer = ({ children, ...props }: any) => {
  return (
    <Box {...props}>
        {children}
    </Box>
  );
};
