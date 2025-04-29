import { Grid } from '@mui/material';

export const Col = ({ children, ...props }: any) => {
  return (
    <Grid item sm={12} xs={12} {...props}>
      {children}
    </Grid>
  );
};
