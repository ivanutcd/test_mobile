import { Grid } from '@mui/material';

export const GridContainer = ({ children }: any) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};
