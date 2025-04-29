import { Grid, styled } from '@mui/material';

export const GroupToolbar = ({ children }: any) => {
  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      {children}
    </Grid>
  );
};

const StyledBtnGroup = styled('div')({
  display: 'flex',
  '& > *': {
    margin: '0 5px', // Ajusta el valor de 5px según lo necesites
  },
});
export const BtnGroup = ({ children }: any) => {
  return <StyledBtnGroup>{children}</StyledBtnGroup>;
};
