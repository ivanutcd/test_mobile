import { useState } from 'react';
import {
  //   TextField,

  Select,
  //   MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Button } from '@components/button/button.tsx';

const AdvancedSearch = () => {
  const [searchParams, setSearchParams] = useState({
    type: '',
    owner: '',
    keywords: '',
    itemName: '',
    location: '',
    modificationDate: '',
    approvals: {
      pending: false,
      myRequests: false,
    },
    sharedWith: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setSearchParams({
      ...searchParams,
      approvals: { ...searchParams.approvals, [name]: checked },
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Aquí iría la lógica para realizar la búsqueda con los parámetros de búsqueda
    console.log(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo</InputLabel>
        <Select
          name="type"
          value={searchParams.type}
          onChange={handleInputChange}
        >
          {/* Opciones del Select */}
        </Select>
      </FormControl>

      {/* Otros campos de texto y selects con la misma estructura */}

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={searchParams.approvals.pending}
              onChange={handleCheckboxChange}
              name="pending"
            />
          }
          label="Esperando mi aprobación"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={searchParams.approvals.myRequests}
              onChange={handleCheckboxChange}
              name="myRequests"
            />
          }
          label="Aprobaciones solicitadas por mí"
        />
      </FormGroup>

      <Button type="submit">Buscar</Button>
    </form>
  );
};

export default AdvancedSearch;
