import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';

import { ColumnDef } from '@components/grid/models/column-def.tsx';

export const mapColumns = (columnDefs: ColumnDef[]) => {
  return columnDefs.map(
    ({
      field,
      valueFormatter,
      valueGetter,
      type,
      headerName,
      renderCell,
      ...otherProps
    }) => {
      return {
        sortable: false,
        field: field,
        headerName: headerName,
        type: type,
        maxWidth: 150,
        minWidth: 150,
        renderCell: renderCell,
        valueGetter: valueGetter
          ? params => {
              return valueGetter && valueGetter(params);
            }
          : undefined,
        valueFormatter: valueFormatter
          ? params => {
              return (
                valueFormatter &&
                valueFormatter({
                  ...params,
                  row: params.api.getRow(params.id as any),
                })
              );
            }
          : undefined,

        ...(otherProps ?? {}),
      } as GridColDef;
    },
  );
};
