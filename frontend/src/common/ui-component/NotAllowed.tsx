import { Typography, Container, Paper } from '@mui/material';

export const NotAllowed = () => {
  return (
    <Container>
      <Paper elevation={10}>
        <Typography variant="body1" color="textSecondary" paragraph>
          No tienes permiso para acceder a esta página.
        </Typography>
      </Paper>
    </Container>
  );
};
