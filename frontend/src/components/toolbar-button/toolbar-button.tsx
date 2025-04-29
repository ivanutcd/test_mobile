import React from 'react';

import { IconButton } from '@mui/material';
import customThemeVars from '../../assets/scss/_themes-vars.module.scss';

export interface ActionToolbar {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
  hide?: boolean; // Función para ocultar la acción
  disabled?: boolean; // Función para deshabilitar la acción
}
interface ToolbarButtonProps {
  actions: ActionToolbar[];
}
// export const generateActionColumn =
//   (actions: ActionColumn[]) => (params: any) => (
//     <ActionColumn actions={actions} rowData={params.row} />
//   );

export const ToolbarButton = ({ actions }: ToolbarButtonProps) => {
  const handleActionClick = (action: ActionToolbar) => {
    if (!action.disabled || !action.disabled) {
      action.onClick();
    }
  };
  return (
    <div
      style={{
        background: `${customThemeVars.greyBackground}`,
        border: `1px solid ${customThemeVars.greyStroke}`,
        color: customThemeVars.grey550,
        display: 'flex',
        gap: '15px',
        height: '40px',
        padding: '11px 16px',
        alignItems: 'center',
        borderRadius: '12px',
      }}
    >
      {actions.map((action, index) => (
        <div key={index}>
          <IconButton size={'medium'} onClick={() => handleActionClick(action)}>
            {action.icon}
          </IconButton>
        </div>
      ))}
    </div>
  );
};
