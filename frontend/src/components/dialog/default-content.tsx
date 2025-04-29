import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';
interface Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
}
export const DefaultContent = ({ title, description }: Props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton>
          <Error sx={{ fontSize: 60, color: 'primary.main' }} color="error" />
        </IconButton>
        <div style={{ marginLeft: 16 }}>
          <Typography variant="h3">{title}</Typography>
          <Typography style={{ paddingTop: 10 }} variant="body1">
            {description}
          </Typography>
        </div>
      </div>
    </>
  );
};
