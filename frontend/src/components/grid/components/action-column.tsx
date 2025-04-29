import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export interface ActionColumn {
  icon: React.ReactNode;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  onClick: (rowData: any) => void;
  label?: string;
  hide?: (rowData: any) => boolean; // Función para ocultar la acción
  disabled?: (rowData: any) => boolean; // Función para deshabilitar la acción
}

interface ActionColumnProps {
  actions: ActionColumn[];
  rowData: any; // Propiedad para pasar los datos de la fila
}

export const generateActionColumn =
  (actions: ActionColumn[]) => (params: any) => (
    <ActionColumn actions={actions} rowData={params.row} />
  );

const ActionColumn: React.FC<ActionColumnProps> = ({ actions, rowData }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: ActionColumn, rowData: any) => {
    handleClose();
    if (!action.disabled || !action.disabled(rowData)) {
      action.onClick(rowData);
    }
  };

  return (
    <div>
      {actions.slice(0, 3).map((action, index) =>
        !action.hide || !action.hide(rowData) ? (
          <IconButton
            color={action.color}
            key={index}
            onClick={() => handleActionClick(action, rowData)}
            disabled={action.disabled ? action.disabled(rowData) : false}
            sx={{ color: '#4DAEBB' }}
          >
            {action.icon}
          </IconButton>
        ) : null,
      )}
      {actions.length > 3 &&
        !actions.slice(3).every(x => x.hide && x.hide(rowData)) && (
          <>
            <IconButton key={3} onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {actions.slice(3).map((action, index) => (
                <MenuItem
                  key={"menu-item-"+index}
                  onClick={() => handleActionClick(action, rowData)}
                  disabled={action.disabled ? action.disabled(rowData) : false}
                  style={{
                    display:
                      action.hide && action.hide(rowData) ? 'none' : 'flex',
                  }}
                >
                  {action.icon} {action.label || 'Sin etiqueta'}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
    </div>
  );
};

export default ActionColumn;
