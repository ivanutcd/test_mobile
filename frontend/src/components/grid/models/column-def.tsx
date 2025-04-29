import { ValueFormatterFunc } from '@components/grid/models/value-formatter-func.tsx';
import React from 'react';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';

interface ColumnDefProps {
  colId?: string;

  field?: string;
  headerName?: string;
  type?: string | string[];
  /** Function or expression. Gets the value from your data for display. */
  valueGetter?: ValueFormatterFunc;

  valueFormatter?: ValueFormatterFunc;
  renderCell?: (params: any) => React.ReactNode;
}

export type ColumnDef = ColumnDefProps | GridColDef;
